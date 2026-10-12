import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function SiteFooter() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <footer className="hairline mt-24 flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-baseline sm:justify-between">
      <ul className="flex gap-6">
        {footerNav.map((item) => (
          <li key={item.href} className="label">
            <Link href={localizedPath(locale, item.href)} className="no-underline hover:text-paper">
              {dict.footer[item.key]}
            </Link>
          </li>
        ))}
      </ul>
      <p className="label">{site.name}</p>
    </footer>
  );
}
