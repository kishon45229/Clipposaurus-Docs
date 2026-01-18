import type { Metadata } from "next";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL || "https://docs.clipposaurus.com"
    : "http://localhost:3001";

export const siteMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Clipposaurus Documentation - Complete Guide to Secure Content Sharing",
    template: "%s | Clipposaurus Docs",
  },
  description:
    "Complete documentation for Clipposaurus - Learn how to securely share text and code snippets with zero-knowledge encryption.",
  keywords: [
    // Documentation-specific
    "clipposaurus documentation",
    "text sharing guide",
    "code sharing guide",
    "encryption documentation",
    "api documentation",
    "developer guide",
    // Feature documentation
    "how to share text securely",
    "zero knowledge encryption guide",
    "drop key tutorial",
    "text encryption guide",
    "code encryption guide",
    // Technical documentation
    "end-to-end encryption docs",
    "secure code transfer guide",
    "secure text transfer guide",
    "privacy tools documentation",
    "developer tools guide",
    // Use cases
    "code sharing tutorial",
    "text sharing tutorial",
    "secure clipboard guide",
    "temporary note storage guide",
  ],
  authors: [{ name: "G. Kishon", url: `${BASE_URL}/about` }],
  creator: "G. Kishon",
  publisher: "G. Kishon",
  applicationName: "Clipposaurus Documentation",
  category: "Documentation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Clipposaurus Documentation",
    title: "Clipposaurus Documentation - Complete Guide to Secure Text and Code Sharing",
    description:
      "Complete documentation for Clipposaurus - Learn how to securely share text and code snippets with zero-knowledge encryption.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Clipposaurus Documentation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipposaurus Documentation",
    description:
      "Complete guide to secure, zero-knowledge text and code sharing",
    images: [`${BASE_URL}/twitter-image.png`],
    creator: "@clipposaurus",
    site: "@clipposaurus",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Clipposaurus Docs",
    "mobile-web-app-capable": "yes",
  },
};
