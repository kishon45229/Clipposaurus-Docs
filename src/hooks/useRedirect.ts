import React from "react";
import {
  APP_URL,
  MARKETING_URL,
  GITHUB_REPO_URL,
  GITHUB_ISSUES_URL,
  GITHUB_SPONSOR_URL,
  CONTACT_EMAIL,
} from "@/lib/urls";

interface RedirectsReturn {
  handleRedictToCurrentPageHome: () => void;
  handleRedirectToApp: () => void;
  handleRedirectToGitHub: () => void;
  handleRedirectToFAQ: () => void;
  handleRedirectToChangelog: () => void;
  handleRedirectToGitHubIssues: () => void;
  handleRedirectToTermsOfService: () => void;
  handleContactUs: () => void;
  handleRedirectToGitHubSponsor: () => void;
}

export function useRedirects(): RedirectsReturn {
  // Home
  const handleRedictToCurrentPageHome = React.useCallback(() => {
    window.location.href = "/";
  }, []);

  // APP
  const handleRedirectToApp = React.useCallback(() => {
    window.location.href = APP_URL!;
  }, []);

  // GITHUB
  const handleRedirectToGitHub = React.useCallback(() => {
    window.open(GITHUB_REPO_URL, "_blank", "noopener noreferrer");
  }, []);

  // GITHUB ISSUES
  const handleRedirectToGitHubIssues = React.useCallback(() => {
    window.open(GITHUB_ISSUES_URL, "_blank", "noopener noreferrer");
  }, []);

  // GITHUB ISSUES
  const handleRedirectToGitHubSponsor = React.useCallback(() => {
    window.open(GITHUB_SPONSOR_URL, "_blank");
  }, []);

  // FAQ
  const handleRedirectToFAQ = React.useCallback(() => {
    window.location.href = MARKETING_URL! + "/faq";
  }, []);

  // CHANGELOG
  const handleRedirectToChangelog = React.useCallback(() => {
    window.location.href = "/changelog";
  }, []);

  // TERMS OF SERVICE
  const handleRedirectToTermsOfService = React.useCallback(() => {
    window.location.href = MARKETING_URL! + "/terms-of-service";
  }, []);

  // CONTACT US
  const handleContactUs = React.useCallback(() => {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  }, []);

  return {
    handleRedictToCurrentPageHome,
    handleRedirectToApp,
    handleRedirectToGitHub,
    handleRedirectToFAQ,
    handleRedirectToChangelog,
    handleRedirectToGitHubIssues,
    handleRedirectToTermsOfService,
    handleContactUs,
    handleRedirectToGitHubSponsor,
  };
}
