import React, { useState } from "react";
import { FeaturedContent } from "../Featured";
import { TrendingGrid } from "../Trending";
import { VideoPlayerPopover, Toast } from "../UI";
import { useData } from "../../hooks";
import type { TrendingContent } from "../../types/content";

interface MainContentProps {
    isExpanded: boolean;
}
export const MainContent: React.FC<MainContentProps> = ({ isExpanded }) => {
    const { setTrendingAsFeatured } = useData();
    const [selectedContent, setSelectedContent] =
        useState<TrendingContent | null>(null);
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handlePlayContent = (content: TrendingContent) => {
        setSelectedContent(content);
        setIsVideoPlayerOpen(true);
    };

    const handleSelectContent = (content: TrendingContent) => {
        setTrendingAsFeatured(content);
        setToastMessage(`"${content.Title}" is now featured!`);
        setShowToast(true);
    };

    const handleCloseVideoPlayer = () => {
        setIsVideoPlayerOpen(false);
        setSelectedContent(null);
    };

    return (
        <>
            <main
                className={`
          flex-1 
          transition-all 
          duration-300 
          ease-in-out
          ${isExpanded ? "ml-64" : "ml-20"}
          bg-[var(--tv-bg-primary)]
          overflow-y-auto
          overflow-x-hidden
          min-h-screen
        `}
            >
                <div className="min-h-full">
                    <FeaturedContent />
                    <TrendingGrid
                        onPlayContent={handlePlayContent}
                        onSelectContent={handleSelectContent}
                    />
                </div>
            </main>

            <VideoPlayerPopover
                isOpen={isVideoPlayerOpen}
                onClose={handleCloseVideoPlayer}
                videoUrl={selectedContent?.VideoUrl}
                title={selectedContent?.Title || ""}
                coverImage={selectedContent?.CoverImage}
            />

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                type="success"
                duration={2500}
            />
        </>
    );
};
