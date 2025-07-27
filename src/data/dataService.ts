import type { AppData, ContentItem, TrendingContent } from "../types/content";
import dataJson from "./data.json";
class DataService {
    private data: AppData;
    private currentFeatured: ContentItem;
    private listeners: Array<(featured: ContentItem) => void> = [];

    constructor() {
        this.data = dataJson as AppData;
        this.currentFeatured = this.data.Featured;
    }

    subscribe(listener: (featured: ContentItem) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener(this.currentFeatured));
    }
    getFeaturedContent(): ContentItem {
        return this.currentFeatured;
    }

    setFeaturedContent(content: TrendingContent | ContentItem): void {
        this.currentFeatured = {
            Id: content.Id,
            Title: content.Title,
            CoverImage: content.CoverImage,
            TitleImage: content.TitleImage,
            Date: content.Date,
            ReleaseYear: content.ReleaseYear,
            MpaRating: content.MpaRating,
            Category: content.Category,
            Duration: content.Duration,
            VideoUrl: content.VideoUrl || "",
            Description: content.Description,
        };

        this.notifyListeners();
    }
    getTrendingContent(): TrendingContent[] {
        return this.data.TendingNow;
    }

    getTrendingByCategory(category: "Movie" | "TV Show"): TrendingContent[] {
        return this.data.TendingNow.filter(
            (item) => item.Category === category
        );
    }

    getContentById(id: string): ContentItem | TrendingContent | null {
        if (this.data.Featured.Id === id) {
            return this.data.Featured;
        }
        return this.data.TendingNow.find((item) => item.Id === id) || null;
    }

    searchContent(query: string): (ContentItem | TrendingContent)[] {
        const results = [];
        const searchTerm = query.toLowerCase();

        if (this.data.Featured.Title.toLowerCase().includes(searchTerm)) {
            results.push(this.data.Featured);
        }

        const trendingResults = this.data.TendingNow.filter((item) =>
            item.Title.toLowerCase().includes(searchTerm)
        );

        return [...results, ...trendingResults];
    }
}

export const dataService = new DataService();
export const formatDuration = (seconds: string | number): string => {
    const totalSeconds =
        typeof seconds === "string" ? parseInt(seconds, 10) : seconds;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
};

export const formatReleaseInfo = (
    year: string,
    rating: string,
    duration: string
): string => {
    const formattedDuration = formatDuration(duration);
    return `${year} ${rating} ${formattedDuration}`;
};

export const getAssetUrl = (imagePath: string): string => {
    return `/assets/${imagePath}`;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
