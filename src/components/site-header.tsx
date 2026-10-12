import Link from "next/link";
import { LocaleSwitch } from "@/components/locale-switch";
import { nav, site } from "@/content/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function SiteHeader() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <header className="hairline flex items-baseline justify-between gap-6 border-b py-5">
      <Link href={localizedPath(locale, "/")} className="label text-paper! no-underline">
        {site.name}
      </Link>
      <div className="flex items-baseline gap-5 sm:gap-8">
        <nav aria-label="Primary">
          <ul className="flex gap-5 sm:gap-8">
            {nav.map((item) => (
              <li key={item.href} className="label">
                {item.live ? (
                  <Link href={localizedPath(locale, item.href)} className="text-paper! no-underline hover:underline">
                    {dict.nav[item.key]}
                  </Link>
                ) : (
                  <span aria-disabled="true" title={dict.nav.soon}>
                    {dict.nav[item.key]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <LocaleSwitch target={locale === "zh" ? "en" : "zh"} label={dict.switchTo} title={dict.switchToLabel} />
      </div>
    </header>
  );
}
