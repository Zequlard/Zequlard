import { cacheLife, cacheTag } from "next/cache";
import { works } from "@/content/work";
import type { Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/dictionaries";

// Pages read the locale from the root param, so it joins the cache key
// without being passed in: one entry per language.

export async function getWorks() {
  "use cache";
  cacheLife("days");
  cacheTag("work");
  const locale = await getLocale();
  return works.map((work) => ({
    slug: work.slug,
    title: work.title[locale],
    summary: work.summary[locale],
    year: work.year,
    role: work.role[locale],
    placeholder: work.placeholder,
  }));
}

export async function getWork(slug: string) {
  return getLocalizedWork(slug, await getLocale());
}

// Route handlers (the OG image) can't read root params, so they pass the
// locale from `params` directly.
export async function getLocalizedWork(slug: string, locale: Locale) {
  "use cache";
  cacheLife("days");
  cacheTag("work", `work:${slug}`);
  const work = works.find((entry) => entry.slug === slug);
  if (!work) return null;
  return {
    ...work,
    title: work.title[locale],
    summary: work.summary[locale],
    role: work.role[locale],
    problem: work.problem[locale],
    approach: work.approach[locale],
    result: work.result[locale],
  };
}

export function getWorkSlugs() {
  return works.map(({ slug }) => ({ slug }));
}
