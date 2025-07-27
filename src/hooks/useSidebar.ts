import { useState, useCallback } from "react";
import type { SidebarMenuItem } from "../types/content";

const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
    { id: "search", label: "Search", icon: "search" },
    { id: "home", label: "Home", icon: "home", isActive: true },
    { id: "tv-shows", label: "TV Shows", icon: "tv" },
    { id: "movies", label: "Movies", icon: "movie" },
    { id: "genres", label: "Genres", icon: "genres" },
    { id: "watch-later", label: "Watch Later", icon: "watchlater" },
];

const SIDEBAR_BOTTOM_ITEMS: SidebarMenuItem[] = [
    { id: "language", label: "Language" },
    { id: "get-help", label: "Get Help" },
    { id: "exit", label: "Exit" },
];

export const useSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState("home");

    const toggleSidebar = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const expandSidebar = useCallback(() => {
        setIsExpanded(true);
    }, []);

    const collapseSidebar = useCallback(() => {
        setIsExpanded(false);
    }, []);

    const setActiveItem = useCallback((itemId: string) => {
        setActiveMenuItem(itemId);
    }, []);

    const getMenuItems = useCallback(() => {
        return SIDEBAR_MENU_ITEMS.map((item) => ({
            ...item,
            isActive: item.id === activeMenuItem,
        }));
    }, [activeMenuItem]);

    const getBottomItems = useCallback(() => {
        return SIDEBAR_BOTTOM_ITEMS;
    }, []);

    return {
        isExpanded,
        activeMenuItem,
        toggleSidebar,
        expandSidebar,
        collapseSidebar,
        setActiveItem,
        getMenuItems,
        getBottomItems,
    };
};

export const useKeyboardNavigation = () => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent, action: () => void) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                action();
            }
        },
        []
    );

    const handleArrowNavigation = useCallback(
        (
            event: KeyboardEvent,
            onUp?: () => void,
            onDown?: () => void,
            onLeft?: () => void,
            onRight?: () => void
        ) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    onUp?.();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    onDown?.();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    onLeft?.();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    onRight?.();
                    break;
            }
        },
        []
    );

    return {
        handleKeyPress,
        handleArrowNavigation,
    };
};
