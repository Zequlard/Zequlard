import type { Localized } from "@/i18n/config";

// Phase 1 content lives in code. When Payload arrives it owns this shape in
// Postgres; the read functions in src/lib/work.ts are the only callers.

export type Work = {
  slug: string;
  title: Localized;
  summary: Localized;
  year: number;
  role: Localized;
  stack: string[];
  url?: string;
  // Placeholder entries render with a visible marker until real copy lands.
  placeholder?: boolean;
  problem: Localized<string[]>;
  approach: Localized<string[]>;
  result: Localized<string[]>;
};

export const works: Work[] = [
  {
    slug: "shorty",
    title: { en: "Shorty", zh: "Shorty" },
    summary: {
      en: "A link shortener where the redirect comes first: short links anyone can open, owned by the person who made them.",
      zh: "一個「轉址優先」的短網址服務：任何人都能直接打開短連結，而連結只屬於建立它的人。",
    },
    year: 2026,
    role: { en: "Design, engineering", zh: "設計、工程" },
    stack: ["Next.js", "Supabase", "Postgres RLS", "Tailwind CSS", "Vercel"],
    url: "https://shorty-dusky-eta.vercel.app",
    problem: {
      en: [
        "Long URLs, especially ones carrying UTM parameters, break across lines in chat, look untrustworthy in email, and are impossible to type from print.",
        "I wanted the smallest shortener that is still useful: a short link anyone can open without an account, and a creator who stays in control of it after it has been shared.",
      ],
      zh: [
        "長網址，尤其是帶著 UTM 參數的那種，在聊天訊息裡會被斷行、在 email 裡看起來不可信，印在紙上更是沒辦法照著打。",
        "我想做一個最精簡但仍然實用的短網址服務：任何人不用註冊就能打開短連結，而建立連結的人在分享出去之後，依然能掌控它。",
      ],
    },
    approach: {
      en: [
        "Redirect first, record later. A short link answers with the redirect immediately; click tracking runs after the response, so measuring a visit never slows the visitor down.",
        "Ownership lives in the database. Links are stored in Supabase Postgres behind Row Level Security, so only the creator can see or manage a link — enforced by the database, not just hidden in the UI.",
        "Control applies on the next click. Each link gets a custom alias like /launch or a generated, easy-to-read code, plus an optional expiry date and a pause switch, all checked at redirect time. A missing or expired link lands on a clear “Link unavailable” page that says why, instead of a generic error.",
        "Opening a link is open to everyone; only creating one needs an account. The interface ships in English and Chinese.",
      ],
      zh: [
        "先轉址，再記錄。短連結會立刻回應轉址，點擊紀錄在回應送出之後才執行，所以統計流量永遠不會拖慢訪客。",
        "擁有權交給資料庫。連結存放在 Supabase Postgres，並以 Row Level Security 保護，只有建立者能查看或管理自己的連結。這是資料庫層級的保證，而不只是在介面上把它藏起來。",
        "設定在下一次點擊就生效。每個連結可以自訂像 /launch 這樣好記的結尾，或由系統產生好讀的短碼；也能設定到期日或隨時暫停，這些都在轉址當下檢查。不存在或已過期的連結會導向清楚的「連結無法使用」頁面並說明原因，而不是丟出一個籠統的錯誤。",
        "打開連結不需要帳號，只有建立連結才需要。介面提供英文與中文。",
      ],
    },
    result: {
      en: [
        "Live on Vercel and free during the beta: paste a URL, optionally add a title and alias, and share the result in about ten seconds.",
        "Each link has a small dashboard with total clicks, the top country, and a 14-day click chart — enough to know a link is working, nothing more complicated.",
      ],
      zh: [
        "已部署在 Vercel，beta 期間免費使用：貼上網址、選填標題與自訂結尾，大約十秒就能分享出去。",
        "每個連結都有一個簡單的儀表板，顯示總點擊數、最多點擊的國家，以及近 14 天的點擊圖表，足以確認連結有在運作，不多做複雜的事。",
      ],
    },
  },
  {
    slug: "zequlard",
    title: { en: "This site", zh: "本站" },
    summary: {
      en: "A portfolio that is itself the proof: static shell first, live data in holes, every cache decision written down.",
      zh: "一個本身就是證明的作品集：靜態外殼先到，即時資料從空洞串流進來，每個快取決策都寫下來。",
    },
    year: 2026,
    role: { en: "Design, engineering", zh: "設計、工程" },
    stack: ["Next.js 16.4", "React 19.3", "Cache Components", "Tailwind 4"],
    problem: {
      en: [
        "Most portfolios are a grid of logos and screenshots. They say what was used, not what was decided, and they rarely survive their own redesign.",
        "I wanted a site where the architecture is part of the argument: every route demonstrates one rendering or caching technique, and the page tells you which.",
      ],
      zh: [
        "大部分作品集是一整排 logo 和截圖。它們說明用了什麼，卻沒說做了什麼決定，而且常常撐不過下一次改版。",
        "我想要一個架構本身就是論點的網站：每個路由示範一種渲染或快取技巧，而頁面會告訴你是哪一種。",
      ],
    },
    approach: {
      en: [
        "Cache Components and Partial Prerendering are on everywhere. The homepage name is in the static shell; the “Now” line is a Suspense hole that streams at request time from a minute-level cache.",
        "Work pages are prerendered per language and slug, and tagged per slug, so an edit invalidates exactly one work and the index, nothing else.",
        "The contact form is a Server Action wired through useActionState, so it submits and reports errors with JavaScript disabled.",
      ],
      zh: [
        "全站開啟 Cache Components 與 Partial Prerendering。首頁的名字在靜態外殼裡；「近況」那一行是 Suspense 空洞，在請求時從分鐘級快取串流進來。",
        "作品頁依語言與 slug 預先渲染，並以 slug 標記，所以修改一件作品只會讓那一頁和作品列表失效，其他都不受影響。",
        "聯絡表單是透過 useActionState 接上的 Server Action，關閉 JavaScript 也能送出並顯示錯誤。",
      ],
    },
    result: {
      en: [
        "Every route ships a static shell, in both languages. The only request-time work on the homepage is the “Now” line.",
        "The colophon lists versions and the things deliberately left out, so the stack page can link to proof instead of claims.",
      ],
      zh: [
        "每個路由在兩種語言下都有靜態外殼。首頁唯一在請求時才做的工作，就是「近況」那一行。",
        "版權頁列出版本與刻意省略的東西，讓技術頁可以連到證明，而不是空口說白話。",
      ],
    },
  },
];
