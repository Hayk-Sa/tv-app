import React, { useState } from "react";
import type { TrendingContent } from "../../types/content";
import { getAssetUrl, formatDuration } from "../../data/dataService";

interface ContentCardProps {
    content: TrendingContent;
    onPlay?: (content: TrendingContent) => void;
    onSelect?: (content: TrendingContent) => void;
}
export const ContentCard: React.FC<ContentCardProps> = ({
    content,
    onPlay,
    onSelect,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
        onSelect?.(content);
    };

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPlay?.(content);
    };

    return (
        <div
            className={`
        group relative cursor-pointer transition-all duration-300 ease-in-out transform hover:z-10
        ${isHovered ? "scale-105" : "scale-100"}
        ${isClicked ? "scale-95" : ""}
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            title="Click to set as featured content"
        >
            <div className="relative bg-[var(--tv-bg-secondary)] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-[2/3] overflow-hidden">
                    {!imageError ? (
                        <img
                            src={getAssetUrl(content.CoverImage)}
                            alt={content.Title}
                            className={`
                w-full h-full object-cover transition-all duration-300
                ${imageLoaded ? "opacity-100" : "opacity-0"}
                ${isHovered ? "scale-110" : "scale-100"}
              `}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-[var(--tv-bg-tertiary)] flex items-center justify-center">
                            <span className="text-[var(--tv-text-muted)] text-sm">
                                Image unavailable
                            </span>
                        </div>
                    )}

                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-[var(--tv-bg-tertiary)] animate-pulse"></div>
                    )}

                    <div
                        className={`
              absolute inset-0 bg-black/60 flex items-center justify-center
              transition-opacity duration-300
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
                    >
                        <button
                            onClick={handlePlayClick}
                            className="
                w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full
                flex items-center justify-center
                hover:bg-white/30 hover:scale-110
                transition-all duration-200
                border-2 border-white/50
              "
                            aria-label={`Play ${content.Title}`}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>

                    <div className="absolute top-2 left-2">
                        <span
                            className={`
                px-2 py-1 text-xs font-semibold rounded
                ${
                    content.Category === "Movie"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                }
              `}
                        >
                            {content.Category === "Movie" ? "MOVIE" : "TV SHOW"}
                        </span>
                    </div>

                    <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 text-xs font-semibold bg-black/70 text-white rounded">
                            {content.MpaRating}
                        </span>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-[var(--tv-text-primary)] font-semibold text-lg mb-2 line-clamp-2 group-hover:text-white transition-colors">
                        {content.Title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-[var(--tv-text-secondary)]">
                        <span>{content.ReleaseYear}</span>
                        <span>{formatDuration(content.Duration)}</span>
                    </div>
                </div>

                <div
                    className={`
            absolute inset-0 border-2 border-[var(--tv-accent-blue)] rounded-lg
            transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
                />
            </div>

            <div
                className="
          absolute inset-0 border-2 border-[var(--tv-accent-blue)] rounded-lg opacity-0
          focus-within:opacity-100 transition-opacity duration-200 pointer-events-none
          z-10
        "
            />
        </div>
    );
};
