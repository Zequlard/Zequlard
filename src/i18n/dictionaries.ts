import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { type Locale, isLocale } from "./config";

const en = {
  meta: {
    description:
      "Editorial portfolio of Zequlard: shipped work, the stack behind it, and notes on how it was made.",
  },
  nav: { work: "Work", stack: "Stack", writing: "Writing", lab: "Lab", soon: "Coming in a later phase" },
  footer: { now: "Now", colophon: "Colophon", contact: "Contact" },
  switchTo: "中文",
  switchToLabel: "閱讀中文版",
  now: {
    title: "What has my attention at the moment.",
    description: "What I am working on at the moment.",
    updated: "Updated",
    today: "today",
    daysAgo: (days: number) => `${days}d ago`,
    loading: "Fetching now…",
  },
  work: {
    title: "Things that shipped, and why they look the way they do.",
    description: "Shipped projects, each told as problem, approach, result.",
    problem: "Problem",
    approach: "Approach",
    result: "Result",
    role: "Role",
    stack: "Stack",
    live: "Live",
    placeholder: "Placeholder entry — replace before launch",
  },
  stack: {
    title: "What I reach for, and the decision behind each.",
    intro: "Only tools used in shipped work or on this site. Each row links to where it is proven.",
    description: "The tools behind shipped work and this site, each with the decision and a link to proof.",
    name: "Name",
    decision: "Decision",
    level: "Level",
    area: "Area",
    proof: "Proof",
    all: "all",
    empty: "Nothing at this intersection yet.",
    levels: { shipped: "shipped", "this-site": "this site" },
    areas: { framework: "framework", data: "data", infra: "infra", craft: "craft" },
  },
  colophon: {
    title: "How this is made, and what was left out.",
    description: "How this site is built: versions, type, cache contract, and what was left out on purpose.",
    versions: "Versions",
    type: "Type & colour",
    cache: "Cache contract",
    omissions: "Deliberate omissions",
  },
  contact: {
    title: "Write to me.",
    intro: "Projects, questions about something here, or a correction. The form works with JavaScript off.",
    description: "Get in touch about work, writing, or anything on this site.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending…",
    sent: "Thanks — it’s on its way. I reply within a few days.",
    failed: "Something went wrong sending that. Please try again.",
    errors: {
      name: "Tell me who you are.",
      email: "That email doesn’t look right.",
      message: "A little more detail, please.",
    },
  },
  notFound: { title: "Nothing here, yet.", body: "Writing and Lab arrive in a later phase.", back: "Back to the start" },
};

export type Dictionary = typeof en;

const zh: Dictionary = {
  meta: {
    description: "Zequlard 的作品集：已上線的作品、背後的技術選擇，以及它們是怎麼做出來的。",
  },
  nav: { work: "作品", stack: "技術", writing: "文章", lab: "實驗", soon: "之後的階段推出" },
  footer: { now: "近況", colophon: "版權頁", contact: "聯絡" },
  switchTo: "EN",
  switchToLabel: "Read in English",
  now: {
    title: "最近在忙的事。",
    description: "我目前正在進行的事情。",
    updated: "更新於",
    today: "今天",
    daysAgo: (days: number) => `${days} 天前`,
    loading: "載入近況中…",
  },
  work: {
    title: "已經上線的作品，以及它們為什麼長這樣。",
    description: "已上線的專案，每一個都以「問題、做法、結果」來說明。",
    problem: "問題",
    approach: "做法",
    result: "結果",
    role: "角色",
    stack: "技術",
    live: "網站",
    placeholder: "範例內容 — 上線前請替換",
  },
  stack: {
    title: "我常用的工具，以及每個選擇背後的理由。",
    intro: "只列出用在已上線作品或本站的工具。每一列都連到能證明它的地方。",
    description: "已上線作品與本站背後的工具，附上決策理由與證明連結。",
    name: "名稱",
    decision: "決策",
    level: "層級",
    area: "領域",
    proof: "證明",
    all: "全部",
    empty: "這個組合目前還沒有項目。",
    levels: { shipped: "已上線", "this-site": "本站" },
    areas: { framework: "框架", data: "資料", infra: "基礎設施", craft: "工藝" },
  },
  colophon: {
    title: "這個網站怎麼做的，以及刻意不做的事。",
    description: "本站的建置方式：版本、字體、快取規則，以及刻意省略的東西。",
    versions: "版本",
    type: "字體與配色",
    cache: "快取規則",
    omissions: "刻意省略",
  },
  contact: {
    title: "寫信給我。",
    intro: "合作專案、對網站內容的提問或指正都歡迎。表單在關閉 JavaScript 時也能使用。",
    description: "關於作品、文章或本站任何內容，都歡迎聯絡我。",
    name: "姓名",
    email: "Email",
    message: "訊息",
    send: "送出",
    sending: "傳送中…",
    sent: "謝謝，訊息已送出。我會在幾天內回覆。",
    failed: "傳送時發生問題，請再試一次。",
    errors: {
      name: "請告訴我你是誰。",
      email: "這個 Email 看起來不太對。",
      message: "請再多寫一點細節。",
    },
  },
  notFound: { title: "這裡還沒有東西。", body: "文章與實驗會在之後的階段推出。", back: "回到首頁" },
};

const dictionaries: Record<Locale, Dictionary> = { en, zh };

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  return dictionaries[await getLocale()];
}
