"use client";

import React from "react";
import { Star, Home } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { useRedirects } from "@/hooks/useRedirect";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { MoreMenu } from "./MoreMenu";

export const NavbarLinks = () => {
  const stars = useGitHubStars();
  const { handleRedirectToApp, handleRedirectToGitHub } = useRedirects();

  return (
    <nav className="hidden sm:flex items-center gap-2" role="navigation" aria-label="Main navigation">
      {/* App */}
      < Button
        variant="ghost"
        onClick={handleRedirectToApp}
        className="navbar-button"
      >
        <Home className="mr-1 navbar-icon" />
        <span className=" text-[clamp(1rem, 2vw, 1.25rem)]">Go to App</span>
      </Button >

      {/* GitHub */}
      < Button
        variant="ghost"
        onClick={handleRedirectToGitHub}
        className="navbar-button"
      >
        <FontAwesomeIcon icon={faGithub} className="mr-2 navbar-icon" />
        <Star className="-mr-0.5 navbar-icon" />
        <span className="font-medium text-[clamp(0.875rem, 2vw, 1.25rem)]">{stars}</span>
      </Button >

      {/* More Menu */}
      <MoreMenu />

      {/* Theme Toggle */}
      < AnimatedThemeToggler className="ml-1 text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400" />
    </nav >
  );
};