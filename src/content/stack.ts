import type { Localized } from "@/i18n/config";

// Only "shipped" or "this site" level entries belong here. Each row links to
// proof: a work page or a colophon anchor.

export const levels = ["shipped", "this-site"] as const;
export type Level = (typeof levels)[number];

export const areas = ["framework", "data", "infra", "craft"] as const;
export type Area = (typeof areas)[number];

export type StackEntry = {
  name: string;
  area: Area;
  level: Level;
  decision: Localized;
  proof: string;
};

export const stack: StackEntry[] = [
  {
    name: "Next.js 16.4",
    area: "framework",
    level: "this-site",
    decision: {
      en: "Cache Components by default; every route must produce a static shell.",
      zh: "預設開啟 Cache Components；每個路由都必須產生靜態外殼。",
    },
    proof: "/work/zequlard",
  },
  {
    name: "React 19.3",
    area: "framework",
    level: "this-site",
    decision: {
      en: "Server Components first; client code only for the contact form state and the language switch.",
      zh: "以 Server Components 為主；只有聯絡表單狀態與語言切換用到客戶端程式碼。",
    },
    proof: "/colophon#versions",
  },
  {
    name: "Supabase",
    area: "data",
    level: "shipped",
    decision: {
      en: "Postgres and auth in one service, so a solo project ships real accounts without running its own auth server.",
      zh: "Postgres 與帳號驗證整合在同一個服務，讓個人專案不必自架驗證伺服器，也能有真正的帳號系統。",
    },
    proof: "/work/shorty",
  },
  {
    name: "Postgres (Row Level Security)",
    area: "data",
    level: "shipped",
    decision: {
      en: "Access rules live in the database: only a link's creator can read or change it, whatever the UI does.",
      zh: "存取規則寫在資料庫裡：不論介面怎麼做，只有連結的建立者能讀取或修改它。",
    },
    proof: "/work/shorty",
  },
  {
    name: "Vercel",
    area: "infra",
    level: "shipped",
    decision: {
      en: "Deploy target for shipped work. The redirect is answered first; click logging runs after the response.",
      zh: "已上線作品的部署平台。先回應轉址，點擊紀錄在回應之後才執行。",
    },
    proof: "/work/shorty",
  },
  {
    name: "Turbopack",
    area: "infra",
    level: "this-site",
    decision: {
      en: "Default bundler for dev and build. No webpack config to maintain.",
      zh: "開發與建置的預設打包工具，不必維護 webpack 設定。",
    },
    proof: "/colophon#versions",
  },
  {
    name: "Tailwind CSS",
    area: "craft",
    level: "shipped",
    decision: {
      en: "Utility-first styling in shipped work; on this site, tokens live in CSS via @theme with no component library.",
      zh: "已上線作品使用 utility-first 樣式；本站則用 @theme 在 CSS 裡定義設計變數，不使用元件庫。",
    },
    proof: "/work/shorty",
  },
  {
    name: "nuqs",
    area: "craft",
    level: "this-site",
    decision: {
      en: "Filter state lives in the URL, parsed on the server, so filters work without JS.",
      zh: "篩選狀態放在網址上、在伺服器解析，所以不用 JS 也能篩選。",
    },
    proof: "/stack?level=this-site",
  },
];
