import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/page-head";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import { getWorks } from "@/lib/work";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return { title: dict.nav.work, description: dict.work.description, alternates: alternates(locale, "/work") };
}

export default async function WorkIndex() {
  const [locale, dict, works] = await Promise.all([getLocale(), getDictionary(), getWorks()]);
  return (
    <>
      <PageHead eyebrow={dict.nav.work} title={dict.work.title} />
      <ol className="hairline border-t">
        {works.map((work, i) => (
          <li key={work.slug} className="hairline border-b">
            <Link
              href={localizedPath(locale, `/work/${work.slug}`)}
              className="group grid gap-x-12 gap-y-2 py-8 no-underline lg:grid-cols-12"
            >
              <span className="label lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-step-2 group-hover:text-sage leading-tight font-light lg:col-span-5">
                {work.title}
              </span>
              <span className="text-mute leading-snug lg:col-span-4">{work.summary}</span>
              <span className="label lg:col-span-2 lg:text-right">
                {work.year} · {work.role}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
