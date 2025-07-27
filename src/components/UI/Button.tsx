import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    onClick,
    disabled = false,
    className = "",
    icon,
}) => {
    const baseClasses = `
    inline-flex
    items-center
    justify-center
    font-semibold
    rounded-lg
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--tv-accent-blue)]
    focus:ring-offset-2
    focus:ring-offset-[var(--tv-bg-primary)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

    const variantClasses = {
        primary: `
      bg-white
      text-black
      hover:bg-gray-100
      active:bg-gray-200
    `,
        secondary: `
      bg-[var(--tv-accent-blue)]
      text-white
      hover:bg-[var(--tv-accent-blue-hover)]
      active:bg-indigo-800
    `,
        ghost: `
      bg-transparent
      text-[var(--tv-text-primary)]
      border-2
      border-[var(--tv-text-secondary)]
      hover:border-[var(--tv-text-primary)]
      hover:bg-[var(--tv-bg-secondary)]
    `,
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm gap-2",
        md: "px-6 py-3 text-base gap-2",
        lg: "px-8 py-4 text-lg gap-3",
    };

    const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
};

export const PlayIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const InfoIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path
            d="M12 16v-4M12 8h.01"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
