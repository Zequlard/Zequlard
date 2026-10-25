import type { Localized } from "@/i18n/config";

// Short-lived by design. Edit, deploy (or hit /api/revalidate with tag "now").
export const now: { updatedAt: string; items: Localized[] } = {
  updatedAt: "2026-10-20",
  items: [
    {
      en: "Repairing project Orbit: subscriptions and tool integration.",
      zh: "正在維修專案 Orbit：訂閱與工具整合。",
    },
  ],
};
