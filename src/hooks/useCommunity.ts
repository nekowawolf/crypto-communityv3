import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CommunityItem } from '@/types/community';
import { fetchCommunityData } from '@/services/communityService';

export const useCommunity = () => {
    const searchParams = useSearchParams();

    const [communityData, setCommunityData] = useState<CommunityItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "All Types");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
        if (!Array.isArray(communityData)) return [];

        return communityData.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All Types" || item.category === selectedCategory || (selectedCategory === "Developers" && item.category === "Developer");
            return matchesSearch && matchesCategory;
        });
    }, [communityData, searchQuery, selectedCategory]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    return {
        communityData: paginatedData,
        allData: filteredData,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems: filteredData.length,
        itemsPerPage
    };
};