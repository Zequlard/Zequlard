import type { Localized } from "@/i18n/config";

// Short-lived by design. Edit, deploy (or hit /api/revalidate with tag "now").
export const now: { updatedAt: string; items: Localized[] } = {
  updatedAt: "2026-10-11",
  items: [
    {
      en: "Shipping phase 1 of this site: poster, works, stack, colophon, contact.",
      zh: "正在完成本站第一階段：首頁、作品、技術地圖、版權頁、聯絡。",
    },
    {
      en: "Reading about cache invalidation contracts that survive a CMS.",
      zh: "在研究能在導入 CMS 之後依然成立的快取失效規則。",
    },
    {
      en: "Next: long-form writing with RSS, then the lab.",
      zh: "下一步：支援 RSS 的長文，然後是實驗室。",
    },
  ],
};
