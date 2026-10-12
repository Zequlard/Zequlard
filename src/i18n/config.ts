export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

// Used when neither the cookie nor Accept-Language picks a locale.
export const defaultLocale: Locale = "zh";
export const localeCookie = "locale";

// BCP 47 tags for <html lang> and hreflang.
export const htmlLang: Record<Locale, string> = { zh: "zh-Hant", en: "en" };
export const localeLabel: Record<Locale, string> = { zh: "中文", en: "EN" };

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

// A value in each language. Content files use this for prose that matters.
export type Localized<T = string> = Record<Locale, T>;

export function localizedPath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
