import type { MetadataRoute } from "next";
import { ALERT_IDS } from "@/lib/alerts";
import { isGithubPages, pagesSiteUrl } from "@/lib/hosting";
import { EXAMPLE_SHARED, resultPath } from "@/lib/share";

export const dynamic = "force-static";

const VERCEL_URL = "https://japan-alert-decoder.vercel.app";
const SITE_URL = isGithubPages ? pagesSiteUrl(VERCEL_URL) : VERCEL_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  if (isGithubPages) {
    return [
      { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/winter/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/legal/disclaimer/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ];
  }
  return [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}${resultPath(EXAMPLE_SHARED).replace(/&/g, "&amp;")}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...ALERT_IDS.map((id) => ({ url: `${SITE_URL}/r?a=${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: id.startsWith("eew") || id.includes("tsunami") || id.startsWith("l4") ? 0.8 : 0.6 })),
    { url: `${SITE_URL}/winter`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/legal/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
