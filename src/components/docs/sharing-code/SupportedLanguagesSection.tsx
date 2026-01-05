import React from "react";
import type { DocsPageSection } from "@/types";

interface SupportedLanguagesSectionData {
    languages: string[];
}

interface SupportedLanguagesSectionProps {
    section: DocsPageSection;
}

export const SupportedLanguagesSection = React.memo<SupportedLanguagesSectionProps>(({ section }) => {
    if (!section.data || !(typeof section.data === "object")) return null;

    const { languages } = section.data as SupportedLanguagesSectionData;

    return (
        <section id={section.id} className="select-none">
            <div className="relative w-full px-4 mx-auto flex flex-wrap justify-center items-center content-start leading-[1.2] gap-[1.2rem]">
                {languages.map((language, index) => {
                    return (
                        <span
                            key={index}
                            className="
                                    inline-block font-semibold whitespace-nowrap
                                    transition-all duration-200
                                    hover:scale-110 hover:text-emerald-600 dark:hover:text-emerald-400
                                    text-zinc-800 dark:text-zinc-200
                                    text-lg opacity-80 leading-none
                                "
                        >
                            {language}
                        </span>
                    );
                })}
            </div>
        </section>
    );
}
);

SupportedLanguagesSection.displayName = "SupportedLanguagesSection";
