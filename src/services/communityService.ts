import { CommunityItem } from '@/types/community';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCommunityData = async (): Promise<CommunityItem[]> => {
    try {
        const fullUrl = `${API_BASE_URL}/cryptocommunity`;
        console.log('Fetching community data from:', fullUrl);

        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText} (URL: ${fullUrl})`);
        }
        const data = await response.json();

        console.log('API Response Data:', data);
        console.log('Is Array?', Array.isArray(data));

        let resultData: CommunityItem[] = [];

        if (!Array.isArray(data)) {
            if (data && Array.isArray(data.data)) {
                resultData = data.data;
            } else {
                console.error('API did not return an array:', data);
                return [];
            }
        } else {
            resultData = data;
        }

        return resultData;
    } catch (error) {
        console.error('Error fetching community data:', error);
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
        console.error('Error fetching community stats:', error);
        return null;
    }
};