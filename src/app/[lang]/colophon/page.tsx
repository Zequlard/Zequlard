import type { Metadata } from "next";
import nextPkg from "next/package.json";
import nuqsPkg from "nuqs/package.json";
import reactPkg from "react/package.json";
import tailwindPkg from "tailwindcss/package.json";
import { PageHead } from "@/components/page-head";
import type { Localized } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.footer.colophon,
    description: dict.colophon.description,
    alternates: alternates(locale, "/colophon"),
  };
}

type Row = [term: string | Localized, detail: Localized];

const versions: Row[] = [
  [`Next.js ${nextPkg.version}`, { en: "App Router, Cache Components, Partial Prerendering, Turbopack", zh: "App Router、Cache Components、Partial Prerendering、Turbopack" }],
  [`React ${reactPkg.version}`, { en: "Server Components; client code only for the contact form and language switch", zh: "Server Components；只有聯絡表單與語言切換用到客戶端程式碼" }],
  [`Tailwind CSS ${tailwindPkg.version}`, { en: "Tokens declared in CSS with @theme", zh: "以 @theme 在 CSS 中宣告設計變數" }],
  [`nuqs ${nuqsPkg.version}`, { en: "Server-side search param parsing for /stack", zh: "在伺服器端解析 /stack 的網址參數" }],
];

const cacheContract: Row[] = [
  ["/", { en: "Static shell; the “Now” line streams per request", zh: "靜態外殼；「近況」那一行在每次請求時串流" }],
  ["/work", { en: "Cached list · cacheLife days · tag work", zh: "快取列表 · cacheLife days · 標籤 work" }],
  ["/work/[slug]", { en: "Prerendered per language and slug · tags work, work:[slug]", zh: "依語言與 slug 預先渲染 · 標籤 work、work:[slug]" }],
  ["/stack", { en: "Unfiltered map in the shell; filtered URLs stream", zh: "未篩選的表格在外殼中；篩選後的網址以串流呈現" }],
  ["/now", { en: "Short-lived · cacheLife minutes · tag now", zh: "短效 · cacheLife minutes · 標籤 now" }],
  ["/colophon", { en: "Static, build time only", zh: "靜態，只在建置時產生" }],
  ["/contact", { en: "Static page; Server Action works without JavaScript", zh: "靜態頁面；Server Action 不需 JavaScript 也能運作" }],
];

const omissions: Row[] = [
  [{ en: "No analytics", zh: "沒有流量分析" }, { en: "Nothing here needs to know who you are.", zh: "這裡沒有任何東西需要知道你是誰。" }],
  [{ en: "No CMS yet", zh: "暫時沒有 CMS" }, { en: "Content lives in code until Payload earns its place; the read functions are the seam.", zh: "在 Payload 證明值得導入之前，內容先放在程式碼裡；讀取函式就是之後替換的接縫。" }],
  [{ en: "No client-side typing script", zh: "沒有客戶端打字腳本" }, { en: "The name is typed with CSS and respects reduced motion.", zh: "名字的打字效果只用 CSS，並尊重「減少動態效果」設定。" }],
  [{ en: "No tech-logo wall", zh: "沒有技術 logo 牆" }, { en: "The stack page names decisions, not brands, and every row links to proof.", zh: "技術頁寫的是決策而不是品牌，每一列都連到證明。" }],
  [{ en: "No light theme", zh: "沒有淺色主題" }, { en: "One palette, done carefully, beats two done halfway.", zh: "把一套配色做好，勝過兩套都做一半。" }],
  [{ en: "Not everything is translated", zh: "不是所有內容都翻譯" }, { en: "Prose that matters is bilingual; tool names and code stay as they are.", zh: "重要的文字有中英雙語；工具名稱與程式碼維持原文。" }],
];

const typeProse: Localized<string[]> = {
  en: [
    "Latin set in Fraunces with optical sizing on, so the name and the body text come from one family at different optical sizes. Chinese falls back to Noto Serif TC. Labels in IBM Plex Mono. Sizes follow a fluid clamp() scale.",
    "Near-black ground, warm off-white type, hairline rules, and one muted sage accent. No colour blocks, no equal-size card grid.",
  ],
  zh: [
    "英文使用開啟光學尺寸的 Fraunces，讓名字與內文來自同一個字族的不同光學尺寸；中文退回到思源宋體（Noto Serif TC）。標籤使用 IBM Plex Mono，字級依照 clamp() 流體比例。",
    "近黑色底、暖白色文字、細線分隔，加上一個低彩度的灰綠色。沒有大色塊，也沒有等大的卡片網格。",
  ],
};

export default async function Colophon() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = (value: string | Localized) => (typeof value === "string" ? value : value[locale]);
  const rows = (list: Row[]) => list.map(([term, detail]) => [t(term), t(detail)] as const);

  return (
    <>
      <PageHead eyebrow={dict.footer.colophon} title={dict.colophon.title} />

      <Section id="versions" title={dict.colophon.versions}>
        <Rows rows={rows(versions)} />
      </Section>

      <Section id="type" title={dict.colophon.type}>
        <div className="max-w-[38rem] space-y-4 text-step-1 leading-relaxed font-light">
          {typeProse[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="cache" title={dict.colophon.cache}>
        <Rows rows={rows(cacheContract)} />
      </Section>

      <Section id="omissions" title={dict.colophon.omissions}>
        <Rows rows={rows(omissions)} />
      </Section>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="hairline grid scroll-mt-8 gap-4 border-t py-10 lg:grid-cols-12">
      <h2 id={`${id}-h`} className="label lg:col-span-3 lg:pt-1">
        {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

function Rows({ rows }: { rows: (readonly [string, string])[] }) {
  return (
    <dl className="divide-hair divide-y">
      {rows.map(([term, detail]) => (
        <div key={term} className="grid gap-x-6 gap-y-1 py-3 first:pt-0 sm:grid-cols-[14rem_1fr]">
          <dt>{term}</dt>
          <dd className="text-mute">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
