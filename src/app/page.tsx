import React from "react";
import { DocsProvider } from "@/contexts/DocsContext";
import { DocsContainer } from "@/components/docs/DocsContainer";
import LoadingFallback from "@/app/loading";

/**
 * DOCS PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function DocsPage() {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <DocsProvider>
        <section className="max-w-480 mx-auto">
          <DocsContainer />
        </section>
      </DocsProvider>
    </React.Suspense>
  );
}
