import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Noto_Serif_TC } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { htmlLang, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

// CJK fallback behind Fraunces. Google serves it in unicode-range slices, so
// only the glyphs on the page are downloaded; too large to preload.
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["300", "400"],
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s — ${site.name}` },
    description: dict.meta.description,
    alternates: alternates(locale, "/"),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html
      lang={htmlLang[locale]}
      className={`${fraunces.variable} ${notoSerifTC.variable} ${plexMono.variable} antialiased`}
    >
      <body className="mx-auto flex min-h-dvh max-w-[90rem] flex-col px-5 sm:px-8 lg:px-12">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
