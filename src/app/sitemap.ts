import { MetadataRoute } from "next";
import { DOCS_URL } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOCS_URL!,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${DOCS_URL}/changelog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
