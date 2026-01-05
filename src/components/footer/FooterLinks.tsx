"use client";

import React from "react";
import Link from "next/link";

const APP_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_PRODUCTION_APP_URL : process.env.NEXT_PUBLIC_DEVELOPMENT_APP_URL;

const footerLinks = [
  { href: APP_URL, label: "Home", external: true },
  { href: "/faq", label: "FAQ", external: false },
  { href: "/changelog", label: "Changelog", external: false },
  { href: "/terms-of-service", label: "Terms", external: false },
];

export const FooterLinks = React.memo(() => {
  return (
    <nav
      className="
        flex flex-wrap items-center
        justify-center xl:justify-end
        gap-[clamp(0.75rem,3vw,2rem)]
        order-1 xl:order-2
      "
    >
      {footerLinks.map((link) => (
        link.external ? (
          <div
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              whitespace-nowrap
              text-[clamp(0.75rem,1.6vw,1rem)]
              text-zinc-600 hover:text-zinc-900
            dark:text-zinc-400 dark:hover:text-zinc-200
            transition-colors duration-200
            cursor-target
          "
          >
            {link.label}
          </div>
        ) : (
          <Link
            key={link.href}
            href={link.href!}
            className="
              whitespace-nowrap
              text-[clamp(0.75rem,1.6vw,1rem)]
              text-zinc-600 hover:text-zinc-900
            dark:text-zinc-400 dark:hover:text-zinc-200
            transition-colors duration-200
             cursor-target
          "
          >
            {link.label}
          </Link>
        )
      ))}
    </nav>
  );
});

FooterLinks.displayName = "FooterLinks";