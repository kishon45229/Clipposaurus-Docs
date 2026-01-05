"use client";

import React from "react";
import { DocsComponent, DocsPage } from "@/types";
import { useDocsComponent } from "@/contexts/ComponentDataContext";
import { useDocsManager, Headings } from "@/hooks/useDocsManager";

interface DocsContextType {
    currentPage: DocsPage | undefined;
    headings: Headings[];
    scrollToHeading: (id: string) => void;
    handleNavigateToPage: (pageId: string) => void;
    handleNavigateToPrevious: () => void;
    handleNavigateToNext: () => void;
    currentPageId: string | null;
    data: DocsComponent;
    isLoading: boolean;
    error: Error | null;
}

const DocsContext = React.createContext<DocsContextType | undefined>(undefined);

interface DocsProviderProps {
    children: React.ReactNode;
}

export function DocsProvider({ children }: DocsProviderProps): React.ReactElement {
    const { data, isLoading, error } = useDocsComponent();
    const { currentPage, headings, scrollToHeading, currentPageId, handleNavigateToPage, handleNavigateToPrevious, handleNavigateToNext } = useDocsManager();

    const contextValue: DocsContextType = React.useMemo(() => ({
        currentPage,
        headings,
        scrollToHeading,
        currentPageId,
        handleNavigateToPage,
        handleNavigateToPrevious,
        handleNavigateToNext,
        data,
        isLoading,
        error,
    }), [currentPage, headings, scrollToHeading, currentPageId, handleNavigateToPage, handleNavigateToPrevious, handleNavigateToNext, data, isLoading, error]);
    return (
        <DocsContext.Provider value={contextValue}>
            {children}
        </DocsContext.Provider>
    );
}

export function useDocs(): DocsContextType {
    const context = React.useContext(DocsContext);
    if (!context) {
        throw new Error("useDocs must be used within a DocsProvider");
    }
    return context;
}
