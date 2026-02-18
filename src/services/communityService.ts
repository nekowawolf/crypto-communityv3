import { CommunityItem } from '@/types/community';

export const fetchCommunityData = async (): Promise<CommunityItem[]> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const fullUrl = `${apiUrl}`;
        console.log('Fetching community data from:', fullUrl);

        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText} (URL: ${fullUrl})`);
        }
        const data = await response.json();

        console.log('API Response Data:', data);
        console.log('Is Array?', Array.isArray(data));

        if (!Array.isArray(data)) {
            if (data && Array.isArray(data.data)) {
                return data.data;
            }
            console.error('API did not return an array:', data);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error fetching community data:', error);
        throw error;
    }
};