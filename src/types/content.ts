export interface ContentItem {
    Id: string;
    Title: string;
    CoverImage: string;
    TitleImage: string;
    Date: string;
    ReleaseYear: string;
    MpaRating: string;
    Category: "Movie" | "TV Show";
    Duration: string;
    VideoUrl?: string;
    Description: string;
}

export interface TrendingContent extends ContentItem {
    VideoUrl: string;
}

export interface AppData {
    Featured: ContentItem;
    TendingNow: TrendingContent[];
}

export interface SidebarMenuItem {
    id: string;
    label: string;
    icon?: string;
    isActive?: boolean;
}

export interface UserProfile {
    name: string;
    avatar?: string;
}

export type DurationInSeconds = number;

export type FormatDuration = (seconds: string | number) => string;
export type FormatReleaseInfo = (
    year: string,
    rating: string,
    duration: string
) => string;
