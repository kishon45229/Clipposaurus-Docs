"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDocsComponent } from "@/contexts/ComponentDataContext";
import { DocsComponent, DocsPage, DocsPageSection } from "@/types";
import { sendFeedback } from "@/services/feedbackService";

interface Step {
  title: string;
}

export interface Headings {
  id: string;
  title: string;
  level: number;
  offset: number;
}

export interface UseDocsManagerReturn {
  // Data
  data: DocsComponent | undefined;
  currentPageId: string;
  currentPage: DocsPage | undefined;

  // States
  isLoading: boolean;
  error: Error | null;

  // Table of contents (headings)
  headings: Headings[];
  activeId: string;

  // Feedback
  isSubmittingFeedback: boolean;

  // TOC actions
  scrollToHeading: (id: string) => void;

  // Navigation functions
  handleNavigateToPage: (pageId: string) => void;
  handleNavigateToNext: () => void;
  handleNavigateToPrevious: () => void;

  // Feedback functions
  submitFeedback: (type: "like" | "dislike") => Promise<void>;
}

export const useDocsManager = (): UseDocsManagerReturn => {
  const pathname = usePathname();
  const router = useRouter();
  const pageFromUrl = pathname.split("/").filter(Boolean)[0] || null;

  const { data, isLoading, error } = useDocsComponent();

  const defaultPageId = pageFromUrl || data?.defaultPage || "introduction";
  const [currentPageId, setCurrentPageId] = React.useState(defaultPageId);

  const [isSubmittingFeedback, setIsSubmittingFeedback] = React.useState(false);
  const [headings, setHeadings] = React.useState<Headings[]>([]);

  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (pageFromUrl) {
      setCurrentPageId((prev) => (prev === pageFromUrl ? prev : pageFromUrl));
      return;
    }

    if (data?.defaultPage) {
      setCurrentPageId((prev) =>
        prev === data.defaultPage ? prev : data.defaultPage
      );
    }
  }, [pageFromUrl, data?.defaultPage]);

  const currentPage = React.useMemo(() => {
    return data?.pages?.find((page) => page.id === currentPageId);
  }, [data?.pages, currentPageId]);

  const handleNavigateToPage = React.useCallback(
    (pageId: string) => {
      setCurrentPageId(pageId);
      router.push(`/${pageId}`);
    },
    [router]
  );

  const handleNavigateToNext = React.useCallback(() => {
    if (!data?.pages) return;
    const currentIndex = data.pages.findIndex(
      (page) => page.id === currentPageId
    );
    if (currentIndex >= 0 && currentIndex < data.pages.length - 1) {
      const nextPage = data.pages[currentIndex + 1];
      handleNavigateToPage(nextPage.id);
    }
  }, [data?.pages, currentPageId, handleNavigateToPage]);

  const handleNavigateToPrevious = React.useCallback(() => {
    if (!data?.pages) return;
    const currentIndex = data.pages.findIndex(
      (page) => page.id === currentPageId
    );
    if (currentIndex > 0) {
      const previousPage = data.pages[currentIndex - 1];
      handleNavigateToPage(previousPage.id);
    }
  }, [data?.pages, currentPageId, handleNavigateToPage]);

  React.useEffect(() => {
    if (!currentPage) {
      setHeadings([]);
      return;
    }

    const extracted: typeof headings = [];
    const idCounts = new Map<string, number>();

    const generateUniqueId = (baseId: string): string => {
      const count = idCounts.get(baseId) || 0;
      idCounts.set(baseId, count + 1);
      return count === 0 ? baseId : `${baseId}-${count}`;
    };

    currentPage.sections.forEach((section: DocsPageSection, index: number) => {
      if (section.title) {
        const id = section.id
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-");

        extracted.push({
          id,
          title: section.title,
          level: 2,
          offset: index * 1000,
        });
      }

      // Only extract step headings for quick-start pages
      if (
        currentPage.id === "quick-start" &&
        section.data &&
        Array.isArray(section.data)
      ) {
        section.data.forEach((step: Step, stepIndex: number) => {
          if (step.title) {
            const baseStepId = step.title
              .toLowerCase()
              .replace(/^step \d+:\s*/i, "")
              .replace(/[^a-z0-9\s]/g, "")
              .replace(/\s+/g, "-");

            const stepId = generateUniqueId(baseStepId);

            extracted.push({
              id: stepId,
              title: step.title.replace(/^Step \d+:\s*/i, ""),
              level: 3,
              offset: index * 1000 + stepIndex * 100,
            });
          }
        });
      }
    });

    setHeadings(extracted);
  }, [currentPage]);

  React.useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      const elems = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      if (elems.length === 0) return;

      let current = "";

      for (let i = elems.length - 1; i >= 0; i--) {
        const el = elems[i];
        if (el && el.offsetTop <= scrollPosition) {
          current = el.id;
          break;
        }
      }

      if (!current && headings.length > 0) {
        current = headings[0].id;
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headings]);

  const scrollToHeading = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const submitFeedback = React.useCallback(
    async (type: "like" | "dislike") => {
      if (!currentPageId || isSubmittingFeedback) return;

      setIsSubmittingFeedback(true);

      try {
        await sendFeedback(currentPageId, type);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      } finally {
        setIsSubmittingFeedback(false);
      }
    },
    [currentPageId, isSubmittingFeedback]
  );

  return {
    // Data
    data,
    currentPageId,
    currentPage,

    // States
    isLoading,
    error,

    // Table of contents
    headings,
    activeId,

    // Feedback
    isSubmittingFeedback,

    // TOC actions
    scrollToHeading,

    // Navigation functions
    handleNavigateToPage,
    handleNavigateToNext,
    handleNavigateToPrevious,

    // Feedback functions
    submitFeedback,
  };
};
