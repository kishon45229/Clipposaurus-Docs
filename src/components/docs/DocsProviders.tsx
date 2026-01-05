"use client";

import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { DocsProvider } from "@/contexts/DocsContext";

interface DocsProvidersProps {
    children: React.ReactNode;
}

export function DocsProviders({ children }: DocsProvidersProps) {
    return (
        <ComponentDataProvider>
            <DocsProvider>
                {children}
            </DocsProvider>
        </ComponentDataProvider>
    );
}