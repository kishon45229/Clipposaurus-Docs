"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const BETA_NOTICE_KEY = "clipposaurus_beta_notice_acknowledged";

export const BetaNotice = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const hasAcknowledged = localStorage.getItem(BETA_NOTICE_KEY);
        if (!hasAcknowledged) {
            setIsVisible(true);
        }
    }, []);

    const handleAcknowledge = () => {
        localStorage.setItem(BETA_NOTICE_KEY, "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="w-full bg-amber-500/90 dark:bg-amber-600/90 backdrop-blur-sm border-b border-amber-600 dark:border-amber-700 py-3 px-4 z-50">
            <div className="w-fit mx-auto flex items-center gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <AlertTriangle className="text-white flex-shrink-0 w-5 h-5" />
                    <p className="text-white text-sm md:text-base font-medium">
                        Clipposaurus is in beta - expect occasional bugs and updates.
                    </p>
                </div>
                <Button
                    onClick={handleAcknowledge}
                    size="sm"
                    className="bg-white hover:bg-gray-100 text-amber-700 font-semibold flex-shrink-0 cursor-target whitespace-nowrap"
                >
                    I Understand
                </Button>
            </div>
        </div>
    );
};