"use client";

import React from "react";
import Link from "next/link";
import { HeartHandshake, Bug, ScrollText, HelpCircle, Mail, FileText } from "lucide-react";
import { useRedirects } from "@/hooks/useRedirect";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export const MoreMenu = () => {
    const { handleRedirectToFAQ, handleRedirectToChangelog, handleRedirectToGitHubIssues, handleRedirectToTermsOfService, handleContactUs, handleRedirectToGitHubSponsor } = useRedirects();

    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="navbar-button bg-transparent text-[clamp(1.125rem, 2vw, 1.375rem)] cursor-target">
                        More
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        className="
              z-50 left-auto right-0
              bg-white/95
              backdrop-blur-xl shadow-xl
              border border-zinc-200
              dark:bg-zinc-900/95 dark:border-zinc-800
            "
                    >
                        <ul className="w-56 p-2 space-y-1">
                            <NavItem
                                href={handleRedirectToFAQ}
                                icon={HelpCircle}
                                title="FAQ"
                                description="Common questions and answers"
                            />
                            <NavItem
                                href={handleRedirectToChangelog}
                                icon={ScrollText}
                                title="Changelog"
                                description="See what's new and improved"
                            />
                            <NavItem
                                href={handleRedirectToGitHubIssues}
                                icon={Bug}
                                title="Report an Issue"
                                description="Found a bug? Let us know"
                            />
                            <NavItem
                                href={handleRedirectToTermsOfService}
                                icon={FileText}
                                title="Terms of Service"
                                description="Read our terms and conditions"
                            />
                            <NavItem
                                href={handleContactUs}
                                icon={Mail}
                                title="Contact Us"
                                description="Get in touch with support"
                            />
                            <li className="
                h-px
                my-2
                bg-zinc-200
                dark:bg-zinc-800
              " />
                            <NavItem
                                href={handleRedirectToGitHubSponsor}
                                icon={HeartHandshake}
                                title="Support the Project"
                                description="Help keep Clipposaurus free"
                                highlight
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

interface NavItemProps {
    href: () => void;
    title: string;
    description: string;
    icon: React.ElementType;
    highlight?: boolean;
}

function NavItem({
    href,
    title,
    description,
    icon: Icon,
    highlight,
}: NavItemProps) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={`
            flex z-50
            gap-3 px-3 py-2
            text-sm
            rounded-xl
            transition-colors
            cursor-target
            ${highlight
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"}
          `}
                >
                    <div className="flex flex-row gap-2">
                        <Icon className="
            shrink-0
            h-4 w-4
            mt-0.5
            opacity-80
          " />
                        <div className="font-medium">{title}</div>
                    </div>
                    <div>
                        <div className="
              text-xs
              opacity-30
            ">{description}
                        </div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}