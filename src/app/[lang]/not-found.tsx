import Link from "next/link";
import { PageHead } from "@/components/page-head";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <PageHead eyebrow="404" title={dict.notFound.title}>
      {dict.notFound.body} <Link href={localizedPath(locale, "/")}>{dict.notFound.back}</Link>.
    </PageHead>
  );
}
