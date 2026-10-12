import { cacheLife, cacheTag } from "next/cache";
import { now } from "@/content/now";
import { getLocale } from "@/i18n/dictionaries";

export async function getNow() {
  "use cache";
  cacheLife("minutes");
  cacheTag("now");
  const locale = await getLocale();
  return { updatedAt: now.updatedAt, items: now.items.map((item) => item[locale]) };
}
