import { useState, useEffect } from "react";
import type { ContentItem, TrendingContent } from "../types/content";
import { dataService } from "../data/dataService";
export const useData = () => {
    const [featured, setFeatured] = useState<ContentItem | null>(null);
    const [trending, setTrending] = useState<TrendingContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            const featuredContent = dataService.getFeaturedContent();
            const trendingContent = dataService.getTrendingContent();

            setFeatured(featuredContent);
            setTrending(trendingContent);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load data"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = dataService.subscribe(
            (newFeatured: ContentItem) => {
                setFeatured(newFeatured);
            }
        );

        return unsubscribe;
    }, []);

    const setTrendingAsFeatured = (trendingItem: TrendingContent) => {
        dataService.setFeaturedContent(trendingItem);
    };

    return {
        featured,
        trending,
        loading,
        error,
        setTrendingAsFeatured,
    };
};

export const useSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<
        (ContentItem | TrendingContent)[]
    >([]);
    const [isSearching, setIsSearching] = useState(false);

    const search = (query: string) => {
        setSearchQuery(query);
        setIsSearching(true);

        try {
            if (query.trim() === "") {
                setSearchResults([]);
            } else {
                const results = dataService.searchContent(query);
                setSearchResults(results);
            }
        } catch {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearching(false);
    };

    return {
        searchQuery,
        searchResults,
        isSearching,
        search,
        clearSearch,
    };
};

export const useContentFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState<
        "All" | "Movie" | "TV Show"
    >("All");
    const { trending } = useData();

    const filteredContent =
        selectedCategory === "All"
            ? trending
            : trending.filter((item) => item.Category === selectedCategory);

    return {
        selectedCategory,
        setSelectedCategory,
        filteredContent,
    };
};
