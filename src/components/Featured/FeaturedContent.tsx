import React, { useState, useEffect } from "react";
import { useData } from "../../hooks";
import { PlayIcon, InfoIcon, VideoPlayerPopover } from "../UI";
import { getAssetUrl, formatReleaseInfo } from "../../data/dataService";
export const FeaturedContent: React.FC = () => {
    const { featured, loading, error } = useData();
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        if (featured) {
            setFadeKey((prev) => prev + 1);
        }
    }, [featured?.Id]);

    const handlePlayClick = () => {
        setIsVideoPlayerOpen(true);
    };

    const handleMoreInfoClick = () => {};

    if (loading) {
        return (
            <section className="relative h-[70vh] bg-gradient-to-b from-gray-900 to-black">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center animate-fade-in">
                        <div className="animate-pulse">
                            <div className="w-32 h-8 bg-gray-700 rounded mb-4 mx-auto"></div>
                            <div className="w-64 h-4 bg-gray-600 rounded mx-auto"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !featured) {
        return (
            <section className="relative h-[70vh] bg-gradient-to-b from-gray-900 to-black">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-2xl font-bold text-red-400 mb-4">
                            Error Loading Content
                        </h1>
                        <p className="text-[var(--tv-text-secondary)]">
                            {error || "Featured content not available"}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url("${getAssetUrl(
                            featured.CoverImage
                        )}")`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--tv-bg-primary)]"></div>
                </div>

                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                        <div
                            key={fadeKey}
                            className="max-w-2xl lg:max-w-3xl animate-fade-in"
                        >
                            <div className="mb-4 sm:mb-6">
                                <span className="inline-block px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 rounded-full uppercase tracking-wider shadow-lg">
                                    {featured.Category}
                                </span>
                            </div>

                            <div className="mb-6 sm:mb-8">
                                <img
                                    src={getAssetUrl(featured.TitleImage)}
                                    alt={featured.Title}
                                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter brightness-0 invert drop-shadow-lg"
                                />
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <p className="text-[var(--tv-text-secondary)] text-lg sm:text-xl font-medium">
                                    {formatReleaseInfo(
                                        featured.ReleaseYear,
                                        featured.MpaRating,
                                        featured.Duration
                                    )}
                                </p>
                            </div>

                            <div className="mb-8 sm:mb-10 lg:mb-12">
                                <p className="text-[var(--tv-text-primary)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl lg:max-w-2xl">
                                    {featured.Description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <button
                                    onClick={handlePlayClick}
                                    className="
                    inline-flex items-center justify-center
                    font-bold rounded-md text-lg gap-3
                    hover:scale-105 focus:outline-none
                    transition-all duration-200
                    w-full sm:w-auto min-w-[160px]
                  "
                                    style={{
                                        backgroundColor: "#ffffff",
                                        color: "#000000",
                                        padding: "16px 32px",
                                        boxShadow:
                                            "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                    }}
                                >
                                    <PlayIcon size={20} />
                                    Play
                                </button>

                                <button
                                    onClick={handleMoreInfoClick}
                                    className="
                    inline-flex items-center justify-center
                    font-semibold rounded-md text-lg gap-3
                    hover:scale-105 focus:outline-none
                    transition-all duration-200
                    w-full sm:w-auto min-w-[160px]
                  "
                                    style={{
                                        backgroundColor:
                                            "rgba(107, 114, 128, 0.8)",
                                        color: "#ffffff",
                                        padding: "16px 32px",
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                    }}
                                >
                                    <InfoIcon size={20} />
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 lg:h-40 bg-gradient-to-t from-[var(--tv-bg-primary)] via-[var(--tv-bg-primary)]/80 to-transparent"></div>
            </section>

            <VideoPlayerPopover
                isOpen={isVideoPlayerOpen}
                onClose={() => setIsVideoPlayerOpen(false)}
                videoUrl={featured.VideoUrl}
                title={featured.Title}
                coverImage={featured.CoverImage}
            />
        </>
    );
};
