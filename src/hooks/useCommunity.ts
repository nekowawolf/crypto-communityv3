import { useState, useEffect, useMemo } from 'react';
import { CommunityItem } from '@/types/community';
import { fetchCommunityData } from '@/services/communityService';

export const useCommunity = () => {
    const [communityData, setCommunityData] = useState<CommunityItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All Types");

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchCommunityData();
                setCommunityData(data);
            } catch (err) {
                setError('Failed to fetch community data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredData = useMemo(() => {
        return communityData.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All Types" || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [communityData, searchQuery, selectedCategory]);

    return {
        communityData: filteredData,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory
    };
};
