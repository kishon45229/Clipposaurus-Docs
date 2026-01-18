export function getSiteJsonLd() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: "Clipposaurus Documentation",
        description:
          "Complete documentation for Clipposaurus - secure, zero-knowledge text and code sharing platform",
        url,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@id": `${url}/#organization`,
        },
        isPartOf: {
          "@type": "WebSite",
          name: "Clipposaurus",
          url: "https://clipposaurus.com",
        },
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: "Clipposaurus",
        url: "https://clipposaurus.com",
        logo: {
          "@type": "ImageObject",
          url: `${url}/logo.png`,
          width: "512",
          height: "512",
        },
      },
      {
        "@type": "TechArticle",
        "@id": `${url}/#documentation`,
        headline: "Clipposaurus Documentation",
        description:
          "Complete technical documentation for using Clipposaurus secure text sharing platform",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: "Clipposaurus Team",
        },
        publisher: {
          "@id": `${url}/#organization`,
        },
        isAccessibleForFree: true,
        inLanguage: "en",
      },
    ],
  };
}
