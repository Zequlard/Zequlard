export const site = {
  name: "ZEQULARD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { href: "/work", key: "work", live: true },
  { href: "/stack", key: "stack", live: true },
  { href: "/writing", key: "writing", live: false },
  { href: "/lab", key: "lab", live: false },
] as const;

export const footerNav = [
  { href: "/now", key: "now" },
  { href: "/colophon", key: "colophon" },
  { href: "/contact", key: "contact" },
] as const;
