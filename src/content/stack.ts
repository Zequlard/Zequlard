import type { Localized } from "@/i18n/config";

// Only "shipped" or "this site" level entries belong here. Each row has a
// one-line introduction and links to where the tool was used.

export const levels = ["shipped", "this-site"] as const;
export type Level = (typeof levels)[number];

export const areas = ["framework", "data", "infra", "craft"] as const;
export type Area = (typeof areas)[number];

export type StackEntry = {
  name: string;
  area: Area;
  level: Level;
  about: Localized;
  proof: string;
};

export const stack: StackEntry[] = [
  {
    name: "Next.js 16.4",
    area: "framework",
    level: "this-site",
    about: {
      en: "React framework with App Router, Server Components and caching built in.",
      zh: "React 全端框架，內建 App Router、Server Components 與快取。",
    },
    proof: "/work/zequlard",
  },
  {
    name: "React 19.3",
    area: "framework",
    level: "this-site",
    about: {
      en: "UI library; Server Components render on the server, client code only where it is needed.",
      zh: "UI 函式庫；Server Components 在伺服器渲染，需要互動的地方才用客戶端程式碼。",
    },
    proof: "/colophon#versions",
  },
  {
    name: "Auth.js",
    area: "framework",
    level: "shipped",
    about: {
      en: "Authentication for web apps: OAuth sign-in, sessions and database adapters.",
      zh: "網頁應用的登入驗證：OAuth 登入、session 與資料庫 adapter。",
    },
    proof: "/work/meows",
  },
  {
    name: "Drizzle ORM",
    area: "data",
    level: "shipped",
    about: {
      en: "Lightweight, type-safe SQL ORM for TypeScript.",
      zh: "輕量、有型別的 TypeScript SQL ORM。",
    },
    proof: "/work/meows",
  },
  {
    name: "PGlite",
    area: "data",
    level: "shipped",
    about: {
      en: "Postgres compiled to WebAssembly; runs embedded, no server needed.",
      zh: "編譯成 WebAssembly 的 Postgres，直接嵌入執行，不用架伺服器。",
    },
    proof: "/work/meows",
  },
  {
    name: "Supabase",
    area: "data",
    level: "shipped",
    about: {
      en: "Hosted Postgres with auth, storage and APIs.",
      zh: "託管的 Postgres，附帳號驗證、儲存與 API。",
    },
    proof: "/work/shorty",
  },
  {
    name: "Postgres (Row Level Security)",
    area: "data",
    level: "shipped",
    about: {
      en: "Access rules enforced per row, inside the database.",
      zh: "在資料庫層級決定每一列資料誰能讀寫。",
    },
    proof: "/work/shorty",
  },
  {
    name: "Vercel",
    area: "infra",
    level: "shipped",
    about: {
      en: "Deployment platform for frontends and serverless functions.",
      zh: "前端與 serverless 函式的部署平台。",
    },
    proof: "/work/shorty",
  },
  {
    name: "Resend",
    area: "infra",
    level: "shipped",
    about: {
      en: "Transactional email API for developers.",
      zh: "給開發者用的交易式郵件 API。",
    },
    proof: "/work/meows",
  },
  {
    name: "Vercel Blob",
    area: "infra",
    level: "shipped",
    about: {
      en: "Object storage for files, served from a public URL.",
      zh: "檔案物件儲存，以公開網址提供。",
    },
    proof: "/work/meows",
  },
  {
    name: "Turbopack",
    area: "infra",
    level: "this-site",
    about: {
      en: "Rust-based bundler that ships with Next.js.",
      zh: "Next.js 內建、以 Rust 寫成的打包工具。",
    },
    proof: "/colophon#versions",
  },
  {
    name: "Tailwind CSS",
    area: "craft",
    level: "shipped",
    about: {
      en: "Utility-first CSS framework.",
      zh: "Utility-first 的 CSS 框架。",
    },
    proof: "/work/shorty",
  },
  {
    name: "MJML",
    area: "craft",
    level: "shipped",
    about: {
      en: "Markup language that compiles to responsive email HTML.",
      zh: "會編譯成響應式 email HTML 的標記語言。",
    },
    proof: "/work/meows",
  },
  {
    name: "dnd-kit",
    area: "craft",
    level: "shipped",
    about: {
      en: "Drag-and-drop toolkit for React, mouse and touch.",
      zh: "React 的拖曳工具組，支援滑鼠與觸控。",
    },
    proof: "/work/meows",
  },
  {
    name: "nuqs",
    area: "craft",
    level: "this-site",
    about: {
      en: "Type-safe URL search-param state for Next.js.",
      zh: "Next.js 的型別安全網址參數狀態。",
    },
    proof: "/stack?level=this-site",
  },
];
