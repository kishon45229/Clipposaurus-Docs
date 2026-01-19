"use client";

import React from "react";
import { useFooterComponent } from "@/contexts/ComponentDataContext";
import { useRedirects } from "@/hooks/useRedirect";
import type { FooterComponent } from "@/components/footer/footer.types";

export interface FooterContextValue {
    data: FooterComponent;
    isLoading: boolean;
    error: Error | null;

    handleRedictToCurrentPageHome: () => void;
    handleRedirectToChangelog: () => void;
    handleRedirectToTermsOfService: () => void;
    handleRedirectToGitHub: () => void;
    handleRedirectToFAQ: () => void;
    handleContactUs: () => void;
    handleRedirectToCreateDrop: () => void;
    handleRedirectToUnlockDrop: () => void;
    handleRedirectToGitHubDiscussions: () => void;
    handleRedirectToDocs: () => void;
    handleRedirectToAbousUs: () => void;
    handleRedirectToPrivacyPolicy: () => void;
    handleRedirectToGitHubSponsor: () => void;
}

const FooterContext = React.createContext<FooterContextValue | undefined>(undefined);

interface FooterProviderProps {
    children: React.ReactNode;
}

export function FooterProvider({ children }: FooterProviderProps): React.ReactElement {
    const { data, isLoading, error } = useFooterComponent();
    const { handleRedictToCurrentPageHome, handleRedirectToChangelog, handleRedirectToGitHubSponsor, handleRedirectToTermsOfService, handleRedirectToGitHub, handleRedirectToFAQ, handleContactUs, handleRedirectToGitHubDiscussions, handleRedirectToCreateDrop, handleRedirectToUnlockDrop, handleRedirectToDocs, handleRedirectToAbousUs, handleRedirectToPrivacyPolicy } = useRedirects();

    const contextValue: FooterContextValue = React.useMemo(() => ({
        data,
        isLoading,
        error,
        handleRedictToCurrentPageHome,
        handleRedirectToChangelog,
        handleRedirectToTermsOfService,
        handleRedirectToGitHub,
        handleRedirectToFAQ,
        handleContactUs,
        handleRedirectToGitHubDiscussions,
        handleRedirectToCreateDrop,
        handleRedirectToUnlockDrop,
        handleRedirectToDocs,
        handleRedirectToAbousUs,
        handleRedirectToPrivacyPolicy,
        handleRedirectToGitHubSponsor
    }), [data, isLoading, error, handleRedictToCurrentPageHome, handleRedirectToGitHubSponsor, handleContactUs, handleRedirectToChangelog, handleRedirectToFAQ, handleRedirectToGitHub, handleRedirectToGitHubDiscussions, handleRedirectToTermsOfService, handleRedirectToCreateDrop, handleRedirectToUnlockDrop, handleRedirectToDocs, handleRedirectToAbousUs, handleRedirectToPrivacyPolicy]);

    return (
        <FooterContext.Provider value={contextValue}>
            {children}
        </FooterContext.Provider>
    );
}

export function useFooter(): FooterContextValue {
    const context = React.useContext(FooterContext);
    if (context === undefined) {
        throw new Error('useFooter must be used within a FooterProvider');
    }
    return context;
}