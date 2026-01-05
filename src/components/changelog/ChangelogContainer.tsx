"use client";

import React from "react";
import { useChangelog } from "@/contexts/ChangelogContext";
import { ComponentError } from "@/components/common/ComponentError";
import { ChangelogSkeleton } from "@/components/skeleton/ChangelogSkeleton";
import { ChangelogContent } from "@/components/changelog/ChangelogContent";

const COMPONENT_ID = "ChangelogComponent" as const;

export const ChangelogContainer = () => {
    const { data, isLoading, error } = useChangelog();

    if (error) return <ComponentError componentId={COMPONENT_ID} />;
    if (isLoading || !data) return <ChangelogSkeleton />;

    return <ChangelogContent />;
};
