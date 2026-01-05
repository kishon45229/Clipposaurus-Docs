"use client";

import React from "react";
import { DocsProvider } from "@/contexts/DocsContext";
import { DocsLeftSidebar } from "@/components/docs/DocsLeftSidebar";
import { DocsContent } from "@/components/docs/DocsContent";
import { DocsRightSidebar } from "@/components/docs/DocsRightSidebar";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import { useDocs } from "@/contexts/DocsContext";
import { ComponentError } from "@/components/common/ComponentError";
import LoadingFallback from "@/app/loading";

const COMPONENT_ID = "DocsContainer";

export const DocsContainer = () => {
    const { data, isLoading, error } = useDocs();

    if (isLoading) return <LoadingFallback />;
    if (error || !data) return <ComponentError componentId={COMPONENT_ID} />;

    return (

        <DocsProvider>
            <SidebarProvider defaultOpen={true} className="h-screen overflow-hidden">
                <div className="flex h-full w-full">
                    <DocsLeftSidebar />
                    <SidebarInset className="flex-1 min-w-0 h-full overflow-hidden">
                        <DocsContent />
                    </SidebarInset>
                    <DocsRightSidebar />
                </div>
            </SidebarProvider>
        </DocsProvider>
    );
};
