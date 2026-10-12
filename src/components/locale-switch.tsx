"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

// Same page, other language. A plain link, so it works before hydration.
export function LocaleSwitch({ target, label, title }: { target: Locale; label: string; title: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  return (
    <Link
      href={`/${target}${rest ? `/${rest}` : ""}`}
      hrefLang={target === "zh" ? "zh-Hant" : "en"}
      title={title}
      className="label no-underline hover:text-paper"
    >
      {label}
    </Link>
  );
}
