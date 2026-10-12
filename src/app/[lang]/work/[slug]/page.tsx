import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { htmlLang, localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { JsonLd } from "@/lib/json-ld";
import { alternates } from "@/lib/metadata";
import { getWork, getWorkSlugs } from "@/lib/work";

export function generateStaticParams() {
  return getWorkSlugs();
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const locale = await getLocale();
  const work = await getWork((await params).slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.summary,
    alternates: alternates(locale, `/work/${work.slug}`),
    openGraph: { type: "article", title: work.title, description: work.summary },
  };
}

const sections = ["problem", "approach", "result"] as const;

export default async function WorkPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const work = await getWork((await params).slug);
  if (!work) notFound();

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: work.title,
          abstract: work.summary,
          dateCreated: String(work.year),
          inLanguage: htmlLang[locale],
          url: new URL(localizedPath(locale, `/work/${work.slug}`), site.url).toString(),
          author: { "@type": "Person", name: "Zequlard", url: site.url },
          keywords: work.stack.join(", "),
        }}
      />

      <header className="grid gap-6 pt-16 pb-12 lg:grid-cols-12 lg:pt-24">
        <p className="label lg:col-span-3 lg:pt-4">
          <Link href={localizedPath(locale, "/work")} className="no-underline hover:text-paper">
            {dict.nav.work}
          </Link>{" "}
          / {work.year}
        </p>
        <div className="lg:col-span-8">
          <h1 className="text-step-3 leading-[1.05] font-light tracking-tight">{work.title}</h1>
          <p className="text-mute mt-6 max-w-[38rem] text-step-1 leading-snug">{work.summary}</p>
          {work.placeholder && (
            <p className="label text-sage! mt-6">{dict.work.placeholder}</p>
          )}
        </div>
      </header>

      <dl className="hairline grid gap-6 border-y py-6 sm:grid-cols-3 lg:grid-cols-12">
        <div className="lg:col-span-3 lg:col-start-4">
          <dt className="label">{dict.work.role}</dt>
          <dd className="mt-1">{work.role}</dd>
        </div>
        <div className="lg:col-span-4">
          <dt className="label">{dict.work.stack}</dt>
          <dd className="mt-1">{work.stack.join(", ")}</dd>
        </div>
        {work.url && (
          <div className="lg:col-span-2">
            <dt className="label">{dict.work.live}</dt>
            <dd className="mt-1">
              <a href={work.url}>{new URL(work.url).host}</a>
            </dd>
          </div>
        )}
      </dl>

      {sections.map((key) => (
        <section key={key} aria-labelledby={key} className="grid gap-4 pt-16 lg:grid-cols-12">
          <h2 id={key} className="label lg:col-span-3 lg:pt-2">
            {dict.work[key]}
          </h2>
          <div className="max-w-[38rem] space-y-5 text-step-1 leading-relaxed font-light lg:col-span-7">
            {work[key].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
