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
    name: "Auth.js",
    area: "framework",
    level: "shipped",
    decision: {
      en: "Google sign-in with JWT sessions, so requests skip a session lookup while users and linked accounts still persist through the Drizzle adapter.",
      zh: "Google 登入搭配 JWT session，每個請求不必查詢 session，使用者與綁定的帳號仍透過 Drizzle adapter 存進資料庫。",
    },
    proof: "/work/meows",
  },
  {
    name: "Drizzle ORM",
    area: "data",
    level: "shipped",
    decision: {
      en: "Typed SQL with a light footprint. Every query filters by the signed-in user, so one account can never read or change another's emails.",
      zh: "有型別、又輕量的 SQL。每個查詢都以登入者過濾，所以一個帳號不可能讀取或修改別人的郵件。",
    },
    proof: "/work/meows",
  },
  {
    name: "PGlite",
    area: "data",
    level: "shipped",
    decision: {
      en: "Embedded Postgres for local development: with no DATABASE_URL, the app creates a database on disk and runs migrations itself. No Docker needed.",
      zh: "本機開發用的嵌入式 Postgres：沒有設定 DATABASE_URL 時，app 會自己在硬碟上建立資料庫並套用 migration，不需要 Docker。",
    },
    proof: "/work/meows",
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
    name: "Resend",
    area: "infra",
    level: "shipped",
    decision: {
      en: "Mail goes through Resend's REST API with a plain fetch, no SDK: test sends in shipped work, limited to the signed-in user's own inbox, and this site's contact form, where the visitor's address is the reply-to. A failed send shows an error instead of a false “sent”.",
      zh: "信件透過 Resend 的 REST API 寄出，直接用 fetch，不裝 SDK：已上線作品用它寄測試信，而且只能寄到登入者自己的信箱；本站的聯絡表單也用它，訪客的信箱放在回覆地址。寄送失敗時會顯示錯誤，而不是假裝「已送出」。",
    },
    proof: "/work/meows",
  },
  {
    name: "Vercel Blob",
    area: "infra",
    level: "shipped",
    decision: {
      en: "Image uploads for emails: PNG, JPG, GIF or WebP up to 5 MB, stored under the uploader's ID with a public URL that mail clients can load.",
      zh: "郵件圖片的上傳空間：接受 5MB 以內的 PNG、JPG、GIF、WebP，依上傳者 ID 存放，並提供信箱讀得到的公開網址。",
    },
    proof: "/work/meows",
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
    name: "MJML",
    area: "craft",
    level: "shipped",
    decision: {
      en: "Every email block outputs MJML, compiled on the server for export and in the browser for the canvas, so the preview and the sent email come from the same markup.",
      zh: "每個郵件區塊都輸出 MJML，匯出時在伺服器編譯、畫布上在瀏覽器編譯，所以預覽和寄出的郵件來自同一份標記。",
    },
    proof: "/work/meows",
  },
  {
    name: "dnd-kit",
    area: "craft",
    level: "shipped",
    decision: {
      en: "Drag to add and reorder blocks with mouse or touch, with sorting animation, instead of a hand-rolled drag layer.",
      zh: "以滑鼠或觸控拖曳新增與排序區塊，附排序動畫，不必自己手寫拖曳邏輯。",
    },
    proof: "/work/meows",
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
