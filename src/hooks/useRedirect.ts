import React from "react";
import {
  APP_URL,
  DOCS_URL,
  MARKETING_URL,
  GITHUB_REPO_URL,
  GITHUB_ISSUES_URL,
  GITHUB_SPONSOR_URL,
  CONTACT_EMAIL,
} from "@/lib/urls";
import { sendRateLimitRequest } from "@/services/rateLimitService";

interface RedirectsReturn {
  showRateLimitDialog: boolean;
  handleRateLimitDialogBoxOpenChange: (open: boolean) => void;

  handleRedictToCurrentPageHome: () => void;
  handleRedirectToApp: () => void;
  handleRedirectToGitHub: () => void;
  handleRedirectToFAQ: () => void;
  handleRedirectToChangelog: () => void;
  handleRedirectToGitHubIssues: () => void;
  handleRedirectToGitHubDiscussions: () => void;
  handleRedirectToTermsOfService: () => void;
  handleContactUs: () => void;
  handleRedirectToGitHubSponsor: () => void;
  handleRedirectToCreateDrop: () => void;
  handleRedirectToUnlockDrop: () => void;
  handleRedirectToDocs: () => void;
}

export function useRedirects(): RedirectsReturn {
  const [showRateLimitDialog, setShowRateLimitDialog] = React.useState(false);

  const handleRateLimitDialogBoxOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open && !showRateLimitDialog) {
        setShowRateLimitDialog(false);
      }
    },
    [showRateLimitDialog],
  );

  // Home
  const handleRedictToCurrentPageHome = React.useCallback(() => {
    window.location.href = "/";
  }, []);

  // APP
  const handleRedirectToApp = React.useCallback(() => {
    window.location.href = APP_URL!;
  }, []);

  // DOCS
  const handleRedirectToDocs = React.useCallback(() => {
    window.location.href = DOCS_URL!;
  }, []);

  // GITHUB
  const handleRedirectToGitHub = React.useCallback(() => {
    window.open(GITHUB_REPO_URL, "_blank", "noopener noreferrer");
  }, []);

  // GITHUB ISSUES
  const handleRedirectToGitHubIssues = React.useCallback(() => {
    window.open(GITHUB_ISSUES_URL, "_blank", "noopener noreferrer");
  }, []);

  // GITHUB DISCUSSIONS
  const handleRedirectToGitHubDiscussions = React.useCallback(() => {
    window.open(
      GITHUB_REPO_URL + "/discussions",
      "_blank",
      "noopener noreferrer",
    );
  }, []);

  // GITHUB SPONSORS
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

  // CREATE DROP
  const handleRedirectToCreateDrop = React.useCallback(async () => {
    const rateLimitResult = await sendRateLimitRequest();
    if (rateLimitResult.allowed) {
      window.location.href = APP_URL + "/create-drop";
      return;
    }
    setShowRateLimitDialog(true);
  }, []);

  // UNLOCK DROP
  const handleRedirectToUnlockDrop = React.useCallback(async () => {
    const rateLimitResult = await sendRateLimitRequest();
    if (rateLimitResult.allowed) {
      window.location.href = APP_URL + "/unlock-drop";
      return;
    }
    setShowRateLimitDialog(true);
  }, []);

  return {
    showRateLimitDialog,
    handleRateLimitDialogBoxOpenChange,

    handleRedictToCurrentPageHome,
    handleRedirectToApp,
    handleRedirectToGitHub,
    handleRedirectToFAQ,
    handleRedirectToChangelog,
    handleRedirectToGitHubIssues,
    handleRedirectToGitHubDiscussions,
    handleRedirectToTermsOfService,
    handleContactUs,
    handleRedirectToGitHubSponsor,
    handleRedirectToCreateDrop,
    handleRedirectToUnlockDrop,
    handleRedirectToDocs,
  };
}
