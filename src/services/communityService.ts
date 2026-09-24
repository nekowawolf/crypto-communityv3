import { CommunityItem } from '@/types/community';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCommunityData = async (): Promise<CommunityItem[]> => {
    try {
        const fullUrl = `${API_BASE_URL}/cryptocommunity`;
        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText} (URL: ${fullUrl})`);
        }
        const data = await response.json();
        let resultData: CommunityItem[] = [];

        if (!Array.isArray(data)) {
            if (data && Array.isArray(data.data)) {
                resultData = data.data;
            } else {
                return [];
            }
        } else {
            resultData = data;
        }
        return resultData;
    } catch (error) {
        throw error;
    }
};

export const fetchCommunityStats = async (): Promise<{ total: number } | null> => {
    try {
        const fullUrl = `${API_BASE_URL}/cryptocommunity/stats`;
        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data?.data ?? null;
    } catch (error) {
        return null;
    }
};

export const submitCommunity = async (
    communityLink: string,
    name: string,
    link: string,
    turnstileToken: string
) => {
    const fullUrl = `${API_BASE_URL}/community-submissions`;
    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            community_link: communityLink,
            name,
            link,
            turnstile_token: turnstileToken,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit community');
    }

    return await response.json();
};