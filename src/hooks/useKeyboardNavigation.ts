import { useEffect, useCallback, useRef, useState } from "react";

interface UseKeyboardNavigationOptions {
    onEnter?: () => void;
    onSpace?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onEscape?: () => void;
    enabled?: boolean;
}

export const useKeyboardNavigation = (
    options: UseKeyboardNavigationOptions = {}
) => {
    const {
        onEnter,
        onSpace,
        onArrowUp,
        onArrowDown,
        onArrowLeft,
        onArrowRight,
        onEscape,
        enabled = true,
    } = options;

    const elementRef = useRef<HTMLElement>(null);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enabled) return;

            switch (event.key) {
                case "Enter":
                    if (onEnter) {
                        event.preventDefault();
                        onEnter();
                    }
                    break;
                case " ":
                    if (onSpace) {
                        event.preventDefault();
                        onSpace();
                    }
                    break;
                case "ArrowUp":
                    if (onArrowUp) {
                        event.preventDefault();
                        onArrowUp();
                    }
                    break;
                case "ArrowDown":
                    if (onArrowDown) {
                        event.preventDefault();
                        onArrowDown();
                    }
                    break;
                case "ArrowLeft":
                    if (onArrowLeft) {
                        event.preventDefault();
                        onArrowLeft();
                    }
                    break;
                case "ArrowRight":
                    if (onArrowRight) {
                        event.preventDefault();
                        onArrowRight();
                    }
                    break;
                case "Escape":
                    if (onEscape) {
                        event.preventDefault();
                        onEscape();
                    }
                    break;
            }
        },
        [
            enabled,
            onEnter,
            onSpace,
            onArrowUp,
            onArrowDown,
            onArrowLeft,
            onArrowRight,
            onEscape,
        ]
    );

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        element.addEventListener("keydown", handleKeyDown);
        return () => {
            element.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return {
        elementRef,
        handleKeyDown,
    };
};

export const useGridNavigation = <T>(
    items: T[],
    columns: number,
    onSelectItem?: (index: number) => void,
    initialIndex = 0
) => {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    const navigateUp = useCallback(() => {
        setSelectedIndex((prev) => {
            const newIndex = prev - columns;
            return newIndex >= 0 ? newIndex : prev;
        });
    }, [columns]);

    const navigateDown = useCallback(() => {
        setSelectedIndex((prev) => {
            const newIndex = prev + columns;
            return newIndex < items.length ? newIndex : prev;
        });
    }, [columns, items.length]);

    const navigateLeft = useCallback(() => {
        setSelectedIndex((prev) => {
            if (prev % columns === 0) return prev;
            return prev - 1;
        });
    }, [columns]);

    const navigateRight = useCallback(() => {
        setSelectedIndex((prev) => {
            if ((prev + 1) % columns === 0 || prev + 1 >= items.length)
                return prev;
            return prev + 1;
        });
    }, [columns, items.length]);

    const selectCurrent = useCallback(() => {
        if (
            onSelectItem &&
            selectedIndex >= 0 &&
            selectedIndex < items.length
        ) {
            onSelectItem(selectedIndex);
        }
    }, [onSelectItem, selectedIndex, items.length]);

    const keyboardNavigation = useKeyboardNavigation({
        onArrowUp: navigateUp,
        onArrowDown: navigateDown,
        onArrowLeft: navigateLeft,
        onArrowRight: navigateRight,
        onEnter: selectCurrent,
        onSpace: selectCurrent,
    });

    return {
        selectedIndex,
        setSelectedIndex,
        ...keyboardNavigation,
    };
};
