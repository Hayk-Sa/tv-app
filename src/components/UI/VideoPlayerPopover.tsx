import React from "react";
import { getAssetUrl } from "../../data/dataService";

interface VideoPlayerPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl?: string;
    title: string;
    coverImage?: string;
}
export const VideoPlayerPopover: React.FC<VideoPlayerPopoverProps> = ({
    isOpen,
    onClose,
    videoUrl,
    title,
    coverImage,
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div className="relative w-full max-w-5xl mx-4 bg-black rounded-xl overflow-hidden shadow-2xl animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Close video player"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M18 6L6 18M6 6l12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {videoUrl ? (
                    <video
                        controls
                        autoPlay
                        className="w-full aspect-video bg-black"
                        poster={
                            coverImage ? getAssetUrl(coverImage) : undefined
                        }
                        preload="metadata"
                    >
                        <source src={videoUrl} type="video/mp4" />
                        <p className="text-white p-4">
                            Your browser does not support the video tag.
                            <a
                                href={videoUrl}
                                className="text-blue-400 hover:text-blue-300 underline ml-1"
                            >
                                Download the video
                            </a>
                        </p>
                    </video>
                ) : (
                    <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
                        <div className="text-center text-white p-8">
                            <div className="mb-6">
                                <svg
                                    width="80"
                                    height="80"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="mx-auto opacity-50"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">
                                {title}
                            </h3>
                            <p className="text-gray-400 text-lg">
                                Video not available
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                The video content is currently unavailable or
                                unable to load.
                            </p>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
                    <h3 className="text-white text-xl font-semibold truncate">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};
