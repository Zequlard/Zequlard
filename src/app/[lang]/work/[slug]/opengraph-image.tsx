import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getLocalizedWork, getWorkSlugs } from "@/lib/work";

export const alt = "Work by Zequlard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getWorkSlugs();
}

// The default OG font has no CJK glyphs. Fetch a Noto Serif TC subset that
// covers exactly the characters on the card (build time only).
async function loadFont(text: string) {
  "use cache";
  cacheLife("max");
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return src ? await fetch(src).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function Image({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  const work = await getLocalizedWork(slug, isLocale(lang) ? lang : defaultLocale);
  const title = work?.title ?? site.name;
  const summary = work?.summary ?? "";
  const font = await loadFont(`${site.name}${title}${summary}${work?.year ?? ""}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0f0f0e",
          color: "#ebe5d9",
          fontFamily: font ? "Noto Serif TC" : undefined,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9a958b" }}>
          <span>{site.name}</span>
          <span>{work?.year}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, lineHeight: 1.1, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 32, lineHeight: 1.4, color: "#9a958b", maxWidth: 940 }}>{summary}</div>
        </div>
        <div style={{ height: 2, width: 120, background: "#8e9c86" }} />
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Noto Serif TC", data: font, weight: 400 }] : undefined },
  );
}
