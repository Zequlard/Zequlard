import type { Metadata } from "next";
import { Suspense } from "react";
import { NowBlock, NowFallback } from "@/components/now-block";
import { PageHead } from "@/components/page-head";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return { title: dict.footer.now, description: dict.now.description, alternates: alternates(locale, "/now") };
}

export default async function NowPage() {
  const dict = await getDictionary();
  return (
    <>
      <PageHead eyebrow={dict.footer.now} title={dict.now.title} />
      <div className="hairline grid border-t pt-10 lg:grid-cols-12">
        <div className="text-step-1 font-light lg:col-span-7 lg:col-start-4">
          <Suspense fallback={<NowFallback label={dict.now.loading} />}>
            <NowBlock />
          </Suspense>
        </div>
      </div>
    </>
  );
}
