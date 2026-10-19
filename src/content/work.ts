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
    slug: "meows",
    title: { en: "Meows", zh: "Meows" },
    summary: {
      en: "A drag-and-drop email builder for people who don't write code: stack blocks, write Markdown, export HTML that holds up in Gmail, Outlook and on phones.",
      zh: "給不寫程式的人用的拖曳式 Email 編輯器：疊區塊、寫 Markdown，匯出在 Gmail、Outlook 與手機上都能正確顯示的 HTML。",
    },
    year: 2026,
    role: { en: "Design, engineering", zh: "設計、工程" },
    stack: ["Next.js", "Auth.js", "Drizzle ORM", "Postgres", "MJML", "dnd-kit", "Vercel Blob", "Resend"],
    url: "https://meows-beta.vercel.app",
    problem: {
      en: [
        "Email HTML is its own dialect: table layouts, inline styles, and clients that each ignore something different. A layout that looks right in the browser can fall apart in Outlook or on a phone.",
        "I wanted an editor where someone who has never touched HTML can put together a newsletter or an order confirmation, and what they see while editing is what actually arrives in the inbox.",
      ],
      zh: [
        "Email 的 HTML 是另一種方言：表格排版、行內樣式，而且每個信箱各自會忽略不同的東西。在瀏覽器裡看起來沒問題的版面，到了 Outlook 或手機上可能就整個跑掉。",
        "我想做一個編輯器，讓從沒碰過 HTML 的人也能排出電子報或訂單確認信，而且編輯時看到的，就是實際寄到信箱裡的樣子。",
      ],
    },
    approach: {
      en: [
        "Every block outputs MJML, not hand-written HTML. Layout, images, buttons and social icons use native MJML tags, so columns stack on phones and client quirks are MJML's problem, not the editor's.",
        "What you edit is what gets sent. Each block on the canvas is compiled in the browser with mjml-browser and rendered in its own iframe, so the email's CSS stays out of the app and the mobile-width preview runs the same media queries as the real email.",
        "39 blocks in 7 groups, from layout to marketing and e-commerce, added by drag (dnd-kit, mouse and touch) or a click. Markdown has its own block, and a whole Markdown document can be imported and split into blocks.",
        "Editing is forgiving: undo and redo, autosave a second after the last change, and five starter templates — blank, newsletter, welcome, promotion and order confirmation.",
        "Accounts use Auth.js with Google sign-in and JWT sessions; emails are stored in Postgres through Drizzle ORM, and every query is scoped to the signed-in user. Locally the app falls back to PGlite, an embedded Postgres, so npm run dev works without Docker or a database.",
      ],
      zh: [
        "每個區塊都輸出 MJML，而不是手寫 HTML。排版、圖片、按鈕與社群圖示都用原生 MJML 標籤，多欄在手機上會自動堆疊，各家信箱的怪癖交給 MJML 處理，而不是編輯器。",
        "編輯的就是寄出的。畫布上每個區塊都在瀏覽器用 mjml-browser 編譯，並放在獨立的 iframe 裡，所以郵件的 CSS 不會汙染 app，手機寬度預覽跑的也是和真正郵件相同的 media query。",
        "39 種元件分成 7 類，從版面到行銷、電商都有，可以拖曳（dnd-kit，滑鼠與觸控都支援）或點一下加入。Markdown 有自己的區塊，也能把整份 Markdown 匯入並自動拆成區塊。",
        "編輯時容許犯錯：可以復原、重做，停手一秒後自動儲存，另外有五種起始範本：空白、電子報、歡迎信、促銷活動與訂單確認。",
        "帳號使用 Auth.js 的 Google 登入與 JWT session；郵件透過 Drizzle ORM 存進 Postgres，每一個查詢都限定在登入者自己的資料。本機開發則改用 PGlite 這個嵌入式 Postgres，不用 Docker、不用另外架資料庫，npm run dev 就能跑。",
      ],
    },
    result: {
      en: [
        "Live on Vercel in beta: sign in, pick a template, and drag an email together. Preview it at desktop or mobile width, or as MJML, HTML and plain text, then download the .mjml or compiled .html.",
        "Images upload to Vercel Blob, and a test send through Resend delivers the email to your own inbox — only your own, so the endpoint can't be used to send mail to anyone else. The interface is in Chinese.",
      ],
      zh: [
        "已部署在 Vercel，目前為 beta：登入、選一個範本，就能拖出一封郵件。可以用桌面或手機寬度預覽，也能看 MJML、HTML 與純文字版本，再下載 .mjml 或編譯好的 .html。",
        "圖片上傳到 Vercel Blob，也能透過 Resend 寄一封測試信到自己的信箱，而且只能寄給自己，所以這個功能無法被拿來寄信給別人。介面為中文。",
      ],
    },
  },
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
        "Opening a link is open to everyone; only creating one needs an account, and deleting that account removes every link and its click history with it. The interface ships in English and Chinese.",
      ],
      zh: [
        "先轉址，再記錄。短連結會立刻回應轉址，點擊紀錄在回應送出之後才執行，所以統計流量永遠不會拖慢訪客。",
        "擁有權交給資料庫。連結存放在 Supabase Postgres，並以 Row Level Security 保護，只有建立者能查看或管理自己的連結。這是資料庫層級的保證，而不只是在介面上把它藏起來。",
        "設定在下一次點擊就生效。每個連結可以自訂像 /launch 這樣好記的結尾，或由系統產生好讀的短碼；也能設定到期日或隨時暫停，這些都在轉址當下檢查。不存在或已過期的連結會導向清楚的「連結無法使用」頁面並說明原因，而不是丟出一個籠統的錯誤。",
        "打開連結不需要帳號，只有建立連結才需要；刪除帳號時，所有連結與點擊紀錄也會一併刪除。介面提供英文與中文。",
      ],
    },
    result: {
      en: [
        "Live on Vercel and free during the beta: paste a URL, optionally add a title and alias, and share the result in about ten seconds.",
        "Each link has a small dashboard with total clicks, the top country, and a click chart for the last 7, 30 or 90 days — enough to know a link is working, nothing more complicated.",
      ],
      zh: [
        "已部署在 Vercel，beta 期間免費使用：貼上網址、選填標題與自訂結尾，大約十秒就能分享出去。",
        "每個連結都有一個簡單的儀表板，顯示總點擊數、最多點擊的國家，以及可切換近 7、30、90 天的點擊圖表，足以確認連結有在運作，不多做複雜的事。",
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
