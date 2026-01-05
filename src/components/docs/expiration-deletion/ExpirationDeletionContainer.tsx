"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types";
import { SectionHeadline } from "@/components/docs/SectionHeadline";
import { ExpirationDeletionOptionsSection } from "@/components/docs/expiration-deletion/ExpirationDeletionOptionsSection";
import { TTLEnforcementSection } from "@/components/docs/expiration-deletion/TTLEnforcementSection";
import { NoBackupsSection } from "@/components/docs/expiration-deletion/NoBackupsSection";
import { CTASection } from "@/components/docs/CTASection";
import { PageHelpful } from "@/components/docs/PageHelpful";

export const ExpirationDeletionContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "retention-options":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <ExpirationDeletionOptionsSection section={section as DocsPageSection} />
                            </div>);
                    case "ttl-enforcement":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <TTLEnforcementSection section={section as DocsPageSection} />
                            </div>);
                    case "no-backups":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <NoBackupsSection section={section as DocsPageSection} />
                            </div>);
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <CTASection section={section as DocsPageSection} />
                                <PageHelpful />
                            </div>);
                    default:
                        return null;
                }
            })}
        </div>
    );
});

ExpirationDeletionContainer.displayName = "ExpirationDeletionContainer";
