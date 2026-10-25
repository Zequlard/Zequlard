import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHead } from "@/components/page-head";
import { type Area, type Level, areas, levels, stack } from "@/content/stack";
import { type Locale, localizedPath } from "@/i18n/config";
import { type Dictionary, getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import { loadStackFilters, serializeStackFilters } from "./search-params";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return { title: dict.nav.stack, description: dict.stack.description, alternates: alternates(locale, "/stack") };
}

type Filters = { level: Level | null; area: Area | null };
const noFilters: Filters = { level: null, area: null };

type Ctx = { locale: Locale; dict: Dictionary };

// Name · about · level · proof. Phones stack the pieces instead.
const columns =
  "gap-x-6 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto_auto] lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_7rem_5rem]";

export default async function StackPage({ searchParams }: PageProps<"/[lang]/stack">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const ctx = { locale, dict };
  return (
    <>
      <PageHead eyebrow={dict.nav.stack} title={dict.stack.title}>
        {dict.stack.intro}
      </PageHead>
      {/* The unfiltered map is the static shell; a filtered URL streams in over it. */}
      <Suspense fallback={<StackMap filters={noFilters} ctx={ctx} />}>
        <FilteredStackMap searchParams={searchParams} ctx={ctx} />
      </Suspense>
    </>
  );
}

async function FilteredStackMap({
  searchParams,
  ctx,
}: Pick<PageProps<"/[lang]/stack">, "searchParams"> & { ctx: Ctx }) {
  const filters = await loadStackFilters(searchParams);
  return <StackMap filters={filters} ctx={ctx} />;
}

function StackMap({ filters, ctx }: { filters: Filters; ctx: Ctx }) {
  const { locale, dict } = ctx;
  const rows = stack.filter(
    (entry) =>
      (!filters.level || entry.level === filters.level) && (!filters.area || entry.area === filters.area),
  );

  return (
    <>
      <nav aria-label="Filters" className="hairline grid gap-4 border-t py-5 lg:grid-cols-12">
        <FilterGroup label={dict.stack.level} name="level" options={levels} filters={filters} ctx={ctx} />
        <FilterGroup label={dict.stack.area} name="area" options={areas} filters={filters} ctx={ctx} />
      </nav>

      {/* One grid for every width: a stacked card on phones, a four-column
          table from sm up. The header row is visual only; each row already
          carries its level and proof in words. */}
      <div aria-hidden="true" className={`hairline hidden border-y py-3 sm:grid ${columns}`}>
        <span className="label">{dict.stack.name}</span>
        <span className="label">{dict.stack.about}</span>
        <span className="label">{dict.stack.level}</span>
        <span className="label text-right">{dict.stack.proof}</span>
      </div>
      <ul className="hairline border-t sm:border-t-0">
        {rows.map((entry) => (
          <li key={entry.name} className={`hairline grid border-b py-5 sm:items-baseline ${columns}`}>
            <span className="text-step-1 leading-tight">{entry.name}</span>
            <span className="text-mute mt-2 max-w-[44ch] leading-snug sm:mt-0">{entry.about[locale]}</span>
            <span className="mt-4 flex justify-between sm:contents">
              <span className={`label whitespace-nowrap ${entry.level === "this-site" ? "text-sage" : ""}`}>
                {dict.stack.levels[entry.level]}
              </span>
              <span className="label sm:text-right">
                <Link href={localizedPath(locale, entry.proof)} className="no-underline hover:text-paper">
                  {dict.stack.proof} →
                </Link>
              </span>
            </span>
          </li>
        ))}
      </ul>
      {rows.length === 0 && <p className="text-mute py-10">{dict.stack.empty}</p>}
    </>
  );
}

function FilterGroup<K extends keyof Filters>({
  label,
  name,
  options,
  filters,
  ctx: { locale, dict },
}: {
  label: string;
  name: K;
  options: readonly NonNullable<Filters[K]>[];
  filters: Filters;
  ctx: Ctx;
}) {
  const current = filters[name];
  const href = (value: Filters[K]) =>
    localizedPath(locale, `/stack${serializeStackFilters({ ...filters, [name]: value })}`);
  const optionLabel = (option: Filters[K]) =>
    option === null ? dict.stack.all : name === "level" ? dict.stack.levels[option as Level] : dict.stack.areas[option as Area];

  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 lg:col-span-6">
      <span className="label w-14">{label}</span>
      {[null, ...options].map((option) => {
        const active = option === current;
        return (
          <Link
            key={option ?? "all"}
            href={href(option as Filters[K])}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={`label ${active ? "text-paper! decoration-sage" : "no-underline hover:text-paper"}`}
          >
            {optionLabel(option as Filters[K])}
          </Link>
        );
      })}
    </div>
  );
}
