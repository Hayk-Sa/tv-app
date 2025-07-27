import React from "react";
import { useData } from "../../hooks";
import { ContentCard } from "./ContentCard";
import type { TrendingContent } from "../../types/content";

interface TrendingGridProps {
    onPlayContent?: (content: TrendingContent) => void;
    onSelectContent?: (content: TrendingContent) => void;
}
export const TrendingGrid: React.FC<TrendingGridProps> = ({
    onPlayContent,
    onSelectContent,
}) => {
    const { trending, loading, error } = useData();

    if (loading) {
        return (
            <section className="px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-[var(--tv-text-primary)] animate-fade-in">
                    Trending Now
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
                    {Array.from({ length: 14 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-[var(--tv-bg-secondary)] rounded-lg overflow-hidden animate-pulse shadow-lg"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="aspect-[2/3] bg-[var(--tv-bg-tertiary)]"></div>
                            <div className="p-3 sm:p-4">
                                <div className="h-3 sm:h-4 bg-[var(--tv-bg-tertiary)] rounded mb-2"></div>
                                <div className="h-2 sm:h-3 bg-[var(--tv-bg-tertiary)] rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-[var(--tv-text-primary)]">
                    Trending Now
                </h2>
                <div className="bg-[var(--tv-bg-secondary)] rounded-lg p-8 lg:p-12 text-center shadow-xl animate-fade-in">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-red-400 mb-4">
                            Error Loading Content
                        </h3>
                        <p className="text-[var(--tv-text-secondary)]">
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (!trending || trending.length === 0) {
        return (
            <section className="px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-[var(--tv-text-primary)]">
                    Trending Now
                </h2>
                <div className="bg-[var(--tv-bg-secondary)] rounded-lg p-8 lg:p-12 text-center shadow-xl animate-fade-in">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[var(--tv-bg-tertiary)] rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-[var(--tv-text-muted)]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--tv-text-primary)] mb-4">
                            No Content Available
                        </h3>
                        <p className="text-[var(--tv-text-secondary)]">
                            No trending content is currently available.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="px-6 sm:px-8 lg:px-12 py-8 lg:py-12 animate-fade-in">
            <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--tv-text-primary)]">
                        Trending Now
                    </h2>
                    <p className="text-[var(--tv-text-secondary)] text-sm mt-1">
                        Click any title to set as featured content
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[var(--tv-text-secondary)] text-sm sm:text-base">
                        {trending.length}{" "}
                        {trending.length === 1 ? "title" : "titles"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
                {trending.map((content, index) => (
                    <div
                        key={content.Id}
                        className="animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <ContentCard
                            content={content}
                            onPlay={onPlayContent}
                            onSelect={onSelectContent}
                        />
                    </div>
                ))}
            </div>

            <div className="h-8 lg:h-12"></div>
        </section>
    );
};
