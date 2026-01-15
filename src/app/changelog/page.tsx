import React from "react";
import { ChangelogContainer } from "@/components/changelog/ChangelogContainer";
import { ChangelogProvider } from "@/contexts/ChangelogContext";
import LoadingFallback from "@/app/loading";

/**
 * CHANGELOG PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function ChangelogPage(): React.ReactElement {
    return (
        <React.Suspense fallback={<LoadingFallback />}>
            <ChangelogProvider>
                <section className="min-h-screen max-w-7xl mx-auto py-2 sm:py-4">
                    <ChangelogContainer />
                </section>
            </ChangelogProvider>
        </React.Suspense>
    );
}
