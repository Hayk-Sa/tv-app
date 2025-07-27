import React from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { useSidebar } from "../../hooks";
export const MainLayout: React.FC = () => {
    const { isExpanded } = useSidebar();

    return (
        <div className="flex h-screen bg-[var(--tv-bg-primary)] text-[var(--tv-text-primary)]">
            <Sidebar />

            {isExpanded && (
                <div
                    className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-300"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0) 100%)",
                        marginLeft: "256px",
                    }}
                />
            )}

            <MainContent isExpanded={isExpanded} />
        </div>
    );
};
