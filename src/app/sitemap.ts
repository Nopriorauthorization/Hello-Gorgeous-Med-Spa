import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now },
    { url: `${site.url}/about`, lastModified: now },
    { url: `${site.url}/services`, lastModified: now },
    { url: `${site.url}/contact`, lastModified: now },
    { url: `${site.url}/book`, lastModified: now },
    { url: `${site.url}/privacy`, lastModified: now },
    { url: `${site.url}/terms`, lastModified: now },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...serviceRoutes];
}

