import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { htmlLang, localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { JsonLd } from "@/lib/json-ld";
import { alternates } from "@/lib/metadata";
import { getWork, getWorkSlugs, getWorks } from "@/lib/work";

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
  const [locale, dict, works] = await Promise.all([getLocale(), getDictionary(), getWorks()]);
  const work = await getWork((await params).slug);
  if (!work) notFound();

  const index = works.findIndex((entry) => entry.slug === work.slug);
  const next = works[(index + 1) % works.length];
  const host = work.url ? new URL(work.url).host : null;

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
          {work.url && host && (
            <p className="mt-8">
              <VisitLink href={work.url} label={dict.work.visit} host={host} />
            </p>
          )}
          {work.placeholder && <p className="label text-sage! mt-6">{dict.work.placeholder}</p>}
        </div>
      </header>

      {/* Role and stack: one line of facts, the stack as wrapping tags so a
          long list never squeezes into a narrow column. */}
      <dl className="hairline grid gap-x-12 gap-y-6 border-y py-6 lg:grid-cols-12">
        <div className="lg:col-span-2 lg:col-start-4">
          <dt className="label">{dict.work.role}</dt>
          <dd className="mt-2 leading-snug">{work.role}</dd>
        </div>
        <div className="lg:col-span-6">
          <dt className="label">{dict.work.stack}</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {work.stack.map((tool) => (
                <li key={tool} className="label hairline border px-2.5 py-1 text-paper! normal-case tracking-normal">
                  {tool}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      {sections.map((key) => (
        <section key={key} aria-labelledby={key} className="grid gap-4 pt-14 lg:grid-cols-12">
          <h2 id={key} className="label lg:col-span-3 lg:pt-1.5">
            {dict.work[key]}
          </h2>
          <div className="max-w-[36rem] space-y-5 leading-relaxed lg:col-span-7">
            {work[key].map((paragraph, i) => (
              // The first paragraph of each section leads; the rest read at body size.
              <p key={paragraph} className={i === 0 ? "text-step-1 leading-snug font-light" : "text-paper/85"}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* Close with the two things a reader does next: open the site, or
          move on to the next work. */}
      <footer className="hairline mt-16 grid gap-6 border-t pt-8 lg:grid-cols-12">
        {work.url && host && (
          <div className="lg:col-span-5 lg:col-start-4">
            <p className="label">{dict.work.live}</p>
            <p className="mt-3">
              <VisitLink href={work.url} label={dict.work.visit} host={host} />
            </p>
          </div>
        )}
        {next && next.slug !== work.slug && (
          <div className={work.url ? "lg:col-span-3 lg:col-start-10" : "lg:col-span-8 lg:col-start-4"}>
            <p className="label">{dict.work.next}</p>
            <Link
              href={localizedPath(locale, `/work/${next.slug}`)}
              className="group mt-3 block text-step-1 leading-tight font-light no-underline hover:text-sage"
            >
              {next.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}
      </footer>
    </article>
  );
}

// Primary action on the page: a bordered button that names the host so the
// reader knows where it goes, opening in a new tab so the portfolio stays.
function VisitLink({ href, label, host }: { href: string; label: string; host: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border border-mute/40 px-5 py-3 no-underline transition-colors hover:border-sage"
    >
      <span className="label text-paper!">
        {label} <span className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
      </span>
      <span className="label normal-case tracking-normal">{host}</span>
    </a>
  );
}
