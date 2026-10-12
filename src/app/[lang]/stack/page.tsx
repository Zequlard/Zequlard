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

      <table className="w-full border-collapse text-left">
        <thead className="sr-only sm:not-sr-only">
          <tr className="hairline border-y">
            <th className="label py-3 font-normal">{dict.stack.name}</th>
            <th className="label hidden py-3 font-normal sm:table-cell">{dict.stack.decision}</th>
            <th className="label py-3 font-normal">{dict.stack.level}</th>
            <th className="label py-3 text-right font-normal">{dict.stack.proof}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry) => (
            <tr key={entry.name} className="hairline border-b align-baseline">
              <td className="py-5 pr-6 text-step-1 leading-tight sm:w-[24%]">
                {entry.name}
                <span className="text-mute mt-2 block text-step-0 leading-snug sm:hidden">{entry.decision[locale]}</span>
              </td>
              <td className="text-mute hidden max-w-[44ch] py-5 pr-6 leading-snug sm:table-cell">
                {entry.decision[locale]}
              </td>
              <td className="label py-5 pr-6 whitespace-nowrap">
                {entry.level === "this-site" ? (
                  <span className="text-sage">{dict.stack.levels[entry.level]}</span>
                ) : (
                  dict.stack.levels[entry.level]
                )}
              </td>
              <td className="label py-5 text-right">
                <Link href={localizedPath(locale, entry.proof)} className="hover:text-paper">
                  {dict.stack.proof} →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
