import type { Metadata } from "next";
import { htmlLang, locales, localizedPath, type Locale } from "@/i18n/config";

// canonical + hreflang for a path that exists in every locale.
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localizedPath(locale, path),
    languages: Object.fromEntries(locales.map((l) => [htmlLang[l], localizedPath(l, path)])),
  };
}
