import React, { useEffect } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
    type?: "success" | "info" | "error";
}
export const Toast: React.FC<ToastProps> = ({
    message,
    isVisible,
    onClose,
    duration = 3000,
    type = "success",
}) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-600 border-green-500";
            case "error":
                return "bg-red-600 border-red-500";
            case "info":
            default:
                return "bg-blue-600 border-blue-500";
        }
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "error":
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "info":
            default:
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <div
                className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 text-white
        ${getTypeStyles()}
        backdrop-blur-sm bg-opacity-95
        max-w-sm w-full
      `}
            >
                <div className="flex-shrink-0">{getIcon()}</div>

                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>

                <button
                    onClick={onClose}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close notification"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
