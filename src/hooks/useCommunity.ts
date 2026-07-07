import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { CommunityItem } from '@/types/community';
import { fetchCommunityData } from '@/services/communityService';

let isInitialLoad = true;

export const useCommunity = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [communityData, setCommunityData] = useState<CommunityItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "All Types");
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                let forceShuffle = false;

                if (isInitialLoad) {
                    isInitialLoad = false;
                    const urlParams = new URLSearchParams(window.location.search);
                    const page = Number(urlParams.get('page')) || 1;
                    if (page === 1) {
                        forceShuffle = true;
                    }
                }

                const data = await fetchCommunityData();
                let finalData = [...data];

                if (typeof sessionStorage !== 'undefined') {
                    const cachedOrderStr = sessionStorage.getItem('cryptoCommunityOrder');
                    const getCommunityKey = (c: any) => c._id || c.id || c.name;

                    if (cachedOrderStr && !forceShuffle) {
                        try {
                            const cachedOrder: string[] = JSON.parse(cachedOrderStr);
                            const orderMap = new Map<string, number>(cachedOrder.map((id, index) => [id, index]));
                            finalData.sort((a, b) => {
                                const aKey = getCommunityKey(a);
                                const bKey = getCommunityKey(b);
                                const aIdx = orderMap.has(aKey) ? orderMap.get(aKey)! : 99999;
                                const bIdx = orderMap.has(bKey) ? orderMap.get(bKey)! : 99999;
                                return aIdx - bIdx;
                            });
                        } catch (e) {
                            console.error('Failed to parse cached order', e);
                        }
                    } else {
                        for (let i = finalData.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [finalData[i], finalData[j]] = [finalData[j], finalData[i]];
                        }
                        const order = finalData.map(c => getCommunityKey(c));
                        sessionStorage.setItem('cryptoCommunityOrder', JSON.stringify(order));
                    }
                }

                setCommunityData(finalData);
            } catch (err) {
                setError('Failed to fetch community data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Debounce search URL update
    useEffect(() => {
        const handler = setTimeout(() => {
            const currentQ = searchParams.get('search') || '';
            if (searchQuery !== currentQ) {
                const params = new URLSearchParams(window.location.search);
                if (searchQuery) params.set('search', searchQuery);
                else params.delete('search');
                params.set('page', '1');
                
                const queryString = params.toString();
                const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
                window.history.pushState(null, '', newUrl);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery, pathname, searchParams]);

    const updateURL = (newCategory: string, newSearch: string, newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        
        if (newCategory !== 'All Types') params.set('category', newCategory);
        else params.delete('category');
        
        if (newSearch) params.set('search', newSearch);
        else params.delete('search');
        
        if (newPage > 1) params.set('page', newPage.toString());
        else params.delete('page');
        
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        window.history.pushState(null, '', newUrl);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        updateURL(category, searchQuery, 1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateURL(selectedCategory, searchQuery, page);
    };

    const filteredData = useMemo(() => {
        if (!Array.isArray(communityData)) return [];

        return communityData.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All Types" || item.category === selectedCategory || (selectedCategory === "Developers" && item.category === "Developer");
            return matchesSearch && matchesCategory;
        });
    }, [communityData, searchQuery, selectedCategory]);

    useEffect(() => {
        const currentSearch = searchParams.get('search') || '';
        const currentCat = searchParams.get('category') || 'All Types';
        const currentPg = Number(searchParams.get('page')) || 1;
        
        setSearchQuery(currentSearch);
        setSelectedCategory(currentCat);
        setCurrentPage(currentPg);
    }, [searchParams.get('search'), searchParams.get('category'), searchParams.get('page')]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const paginatedData = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, validCurrentPage, itemsPerPage]);

    return {
        communityData: paginatedData,
        allData: filteredData,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory: handleCategoryChange,
        currentPage: validCurrentPage,
        setCurrentPage: handlePageChange,
        totalPages,
        totalItems: filteredData.length,
        itemsPerPage
    };
};