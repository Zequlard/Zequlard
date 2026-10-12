import Link from "next/link";
import { Suspense } from "react";
import { NowLine } from "@/components/now-block";
import { TypedLine } from "@/components/typed-line";
import { site } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function Home() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    // Full viewport minus the header: just the name, typed once.
    <section className="grid min-h-[calc(100svh-4.5rem)] grid-rows-[1fr_auto] pb-8">
      <TypedLine
        as="h1"
        text={site.name}
        className="text-poster self-center leading-[0.82] font-light tracking-[-0.045em]"
        style={{ fontVariationSettings: '"opsz" 144', "--step": "140ms" } as React.CSSProperties}
      />
      <p className="label flex gap-3">
        <Link href={localizedPath(locale, "/now")} className="no-underline hover:text-paper">
          {dict.footer.now} <span className="text-sage">●</span>
        </Link>
        <Suspense fallback={<span>…</span>}>
          <NowLine />
        </Suspense>
      </p>
    </section>
  );
}
