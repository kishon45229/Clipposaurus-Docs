import React from "react";
import { ChangelogContainer } from "@/components/changelog/ChangelogContainer";
import { ChangelogProvider } from "@/contexts/ChangelogContext";

/**
 * CHANGELOG PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function ChangelogPage(): React.ReactElement {
    return (
            <ChangelogProvider>
                <section className="xl:min-h-screen max-w-480 mx-auto py-2 sm:py-4">
                    <ChangelogContainer />
                </section>
            </ChangelogProvider>
    );
}
