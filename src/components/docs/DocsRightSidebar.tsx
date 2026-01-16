"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import { DocsRightSidebarSkeleton } from "@/components/skeleton/DocsRightSidebarSkeleton";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

export const DocsRightSidebar = () => {
    const { currentPage, isLoading, error, headings, scrollToHeading } = useDocs();

    const headingIds = React.useMemo(() =>
        headings?.map(heading => heading.id) || [],
        [headings]
    );

    const activeSection = useScrollSpy(headingIds, 150, "docs-content-scroll");

    if (isLoading || error || !currentPage) return <DocsRightSidebarSkeleton />;
    if (!headings || headings.length === 0) return null;

    return (
        <Sidebar
            side="right"
            variant="sidebar"
            collapsible="offcanvas"
            className="
                h-full border-l border-zinc-200 dark:border-zinc-800/60
                backdrop-blur-xl
            "
        >
            <SidebarContent className="bg-transparent py-3 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase underline-offset-4 text-zinc-400 dark:text-zinc-500 pb-1">
                        On This Page
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {headings.map((heading) => {
                                const isActive = activeSection === heading.id;
                                const paddingLeft = (heading.level - 1) * 12;

                                return (
                                    <SidebarMenuItem key={heading.id}>
                                        <SidebarMenuButton
                                            onClick={() => scrollToHeading(heading.id)}
                                            isActive={isActive}
                                            className={`
                                                transition-all duration-200
                                                rounded-xl px-3 py-2 text-sm cursor-target
                                                ${isActive
                                                    ? "bg-zinc-800 data-[active=true]:bg-zinc-200 dark:data-[active=true]:bg-zinc-900 data-[active=true]:text-emerald-500 shadow-inner"
                                                    : "text-zinc-900 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800/40"
                                                }
                                            `}
                                        >
                                            {heading.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};
