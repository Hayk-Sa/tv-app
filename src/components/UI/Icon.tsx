import React from "react";
import { getAssetUrl } from "../../data/dataService";

interface IconProps {
    name: string;
    size?: number;
    className?: string;
    alt?: string;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    className = "",
    alt = "",
}) => {
    const getIconPath = (iconName: string): string => {
        const iconMap: Record<string, string> = {
            search: "icons/ICON - Search.png",
            home: "icons/Group 46.png",
            tv: "icons/Group 47.png",
            movie: "icons/Group 53.png",
            genres: "icons/Group 54.png",
            watchlater: "icons/Group 56.png",
        };

        return iconMap[iconName] || "icons/Group 46.png";
    };

    return (
        <img
            src={getAssetUrl(getIconPath(name))}
            alt={alt || name}
            width={size}
            height={size}
            className={`${className} select-none`}
            style={{
                filter: "brightness(0) invert(1)",
                opacity: 0.8,
            }}
        />
    );
};

export const ArrowIcon: React.FC<{
    isExpanded: boolean;
    className?: string;
}> = ({ isExpanded, className = "" }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
        } ${className}`}
    >
        <path
            d="M6 12l4-4-4-4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
