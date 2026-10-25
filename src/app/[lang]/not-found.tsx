import Link from "next/link";
import { PageHead } from "@/components/page-head";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <PageHead eyebrow="404" title={dict.notFound.title}>
      <p>{dict.notFound.body}</p>
      <p className="mt-6">
        <Link href={localizedPath(locale, "/")} className="label no-underline hover:text-paper">
          {dict.notFound.back} →
        </Link>
      </p>
    </PageHead>
  );
}
