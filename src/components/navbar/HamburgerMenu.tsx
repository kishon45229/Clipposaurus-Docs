"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Menu,
    Home,
    Star,
    HelpCircle,
    ScrollText,
    Bug,
    HeartHandshake,
    FileText,
    Mail,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { useRedirects } from "@/hooks/useRedirect";

export const HamburgerMenu = () => {
    const stars = useGitHubStars();
    const { handleRedirectToApp, handleRedirectToGitHub, handleRedirectToFAQ, handleRedirectToChangelog, handleRedirectToGitHubIssues, handleRedirectToTermsOfService, handleContactUs, handleRedirectToGitHubSponsor } = useRedirects();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                >
                    <Menu className="navbar-icon" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="hamburger-menu-content"
            >
                {/* Docs */}
                <DropdownMenuItem
                    onClick={handleRedirectToApp}
                    className="hamburger-menu-item"
                >
                    <Home className="hamburger-menu-icon-item" />
                    Go to Home
                </DropdownMenuItem>

                {/* FAQ */}
                <DropdownMenuItem
                    onClick={handleRedirectToFAQ}
                    className="hamburger-menu-item"
                >
                    <HelpCircle className="hamburger-menu-icon-item" />
                    FAQ
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 bg-zinc-200 dark:bg-zinc-800" />

                {/* GitHub */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHub}
                    className="hamburger-menu-item"
                >
                    <FontAwesomeIcon icon={faGithub} className="hamburger-menu-icon-item" />
                    GitHub
                    <span className="flex items-center justify-center gap-2 ml-auto text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400">
                        <Star className="hamburger-menu-icon-item" />
                        {stars}
                    </span>
                </DropdownMenuItem>

                {/* Changelog */}
                <DropdownMenuItem
                    onClick={handleRedirectToChangelog}
                    className="hamburger-menu-item"
                >
                    <ScrollText className="hamburger-menu-icon-item" />
                    Changelog
                </DropdownMenuItem>

                {/* Report Issue */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHubIssues}
                    className="hamburger-menu-item"
                >
                    <Bug className="hamburger-menu-icon-item" />
                    Report an Issue
                </DropdownMenuItem>

                {/* Terms of Service */}
                <DropdownMenuItem
                    onClick={handleRedirectToTermsOfService}
                    className="hamburger-menu-item"
                >
                    <FileText className="hamburger-menu-icon-item" />
                    Terms of Service
                </DropdownMenuItem>

                {/* Contact Us */}
                <DropdownMenuItem
                    onClick={handleContactUs}
                    className="hamburger-menu-item"
                >
                    <Mail className="hamburger-menu-icon-item" />
                    Contact Us
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 bg-zinc-200 dark:bg-zinc-800" />

                {/* Donate */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHubSponsor}
                    className="hamburger-menu-item bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                    <HeartHandshake className="hamburger-menu-icon-item" />
                    Support the Project
                </DropdownMenuItem>
            </DropdownMenuContent >
        </DropdownMenu >
    );
};