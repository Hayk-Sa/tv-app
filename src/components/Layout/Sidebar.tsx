import React from "react";
import { useSidebar } from "../../hooks";
import { Icon, ArrowIcon } from "../UI";
export const Sidebar: React.FC = () => {
    const {
        isExpanded,
        toggleSidebar,
        getMenuItems,
        getBottomItems,
        setActiveItem,
    } = useSidebar();

    const menuItems = getMenuItems();
    const bottomItems = getBottomItems();

    return (
        <>
            {isExpanded && (
                <div
                    className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.1) 100%)",
                    }}
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`
          fixed 
          left-0 
          top-0 
          h-full 
          transition-all 
          duration-300 
          ease-in-out
          z-50
          ${
              isExpanded
                  ? "w-64 bg-black/95 backdrop-blur-md"
                  : "w-20 bg-[var(--tv-bg-secondary)]"
          }
          border-r border-[var(--tv-bg-tertiary)]
          shadow-2xl
        `}
            >
                <div className="flex flex-col h-full">
                    <div
                        className={`${
                            isExpanded ? "p-6 pb-4" : "p-4 pb-6"
                        } border-b border-[var(--tv-bg-tertiary)]`}
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-[var(--tv-accent-blue)] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ml-2">
                                <span className="text-white font-semibold text-xl">
                                    D
                                </span>
                            </div>

                            {isExpanded && (
                                <div className="ml-4 min-w-0 animate-fade-in">
                                    <p className="text-[var(--tv-text-primary)] font-semibold truncate text-xl leading-tight">
                                        Daniel
                                    </p>
                                    <p className="text-[var(--tv-text-secondary)] text-sm truncate mt-1">
                                        Premium Member
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav
                        className={`flex-1 ${
                            isExpanded ? "pt-6 pb-4" : "py-8"
                        }`}
                    >
                        <ul className="space-y-6">
                            {menuItems.map((item, index) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveItem(item.id)}
                                        className={`
                      w-full 
                      flex 
                      items-center 
                      py-3
                      text-left 
                      transition-all 
                      duration-200
                      relative
                      group
                      ${
                          item.isActive
                              ? isExpanded
                                  ? "bg-[var(--tv-accent-blue)] text-white rounded-r-2xl mr-6"
                                  : "bg-[var(--tv-accent-blue)] text-white rounded-lg mx-2"
                              : "text-[var(--tv-text-secondary)] hover:bg-[var(--tv-bg-tertiary)] hover:text-[var(--tv-text-primary)]"
                      }
                      ${!isExpanded && !item.isActive ? "rounded-lg mx-2" : ""}
                    `}
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                        }}
                                    >
                                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center ml-8">
                                            {item.icon && (
                                                <Icon
                                                    name={item.icon}
                                                    size={24}
                                                    className={`transition-all duration-200 ${
                                                        item.isActive
                                                            ? "opacity-100"
                                                            : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                                                    }`}
                                                />
                                            )}
                                        </div>

                                        {isExpanded && (
                                            <span className="font-medium truncate transition-all duration-200 animate-fade-in text-base ml-4">
                                                {item.label}
                                            </span>
                                        )}

                                        {!isExpanded && (
                                            <div
                                                className="
                        absolute left-full ml-2 px-3 py-2 
                        bg-[var(--tv-bg-primary)] text-[var(--tv-text-primary)] 
                        rounded shadow-lg text-sm font-medium
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200
                        pointer-events-none
                        whitespace-nowrap
                        z-10
                      "
                                            >
                                                {item.label}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div
                        className={`border-t border-[var(--tv-bg-tertiary)] ${
                            isExpanded ? "pt-4 pb-4" : "py-6"
                        }`}
                    >
                        <ul className="space-y-4">
                            {bottomItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        className={`
                      w-full 
                      flex 
                      items-center 
                      py-2
                      text-left 
                      text-[var(--tv-text-muted)] 
                      hover:bg-[var(--tv-bg-tertiary)] 
                      hover:text-[var(--tv-text-primary)]
                      transition-all 
                      duration-200
                      group
                      relative
                      ${!isExpanded ? "mx-2 rounded-lg" : ""}
                    `}
                                    >
                                        {isExpanded && (
                                            <span className="font-normal truncate text-xs animate-fade-in uppercase tracking-widest opacity-60 ml-14">
                                                {item.label}
                                            </span>
                                        )}

                                        {!isExpanded && (
                                            <div
                                                className="
                        absolute left-full ml-2 px-3 py-2 
                        bg-[var(--tv-bg-primary)] text-[var(--tv-text-primary)] 
                        rounded shadow-lg text-sm font-medium
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200
                        pointer-events-none
                        whitespace-nowrap
                        z-10
                      "
                                            >
                                                {item.label}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className={`border-t border-[var(--tv-bg-tertiary)] ${
                            isExpanded ? "p-4" : "p-6"
                        }`}
                    >
                        <button
                            onClick={toggleSidebar}
                            className={`
                w-full 
                flex 
                items-center 
                justify-center 
                p-2
                text-[var(--tv-text-secondary)] 
                hover:text-[var(--tv-text-primary)] 
                hover:bg-[var(--tv-bg-tertiary)]
                rounded-lg
                transition-all 
                duration-200
                group
              `}
                            aria-label={
                                isExpanded
                                    ? "Collapse sidebar"
                                    : "Expand sidebar"
                            }
                        >
                            <ArrowIcon
                                isExpanded={isExpanded}
                                className="group-hover:scale-110"
                            />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
