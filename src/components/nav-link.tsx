"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Primary nav item that knows which section is open. The pathname is
// /[lang]/section/..., so the second segment names the section.
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const section = `/${pathname.split("/")[2] ?? ""}`;
  const active = section === `/${href.split("/")[2] ?? ""}`;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-paper! ${active ? "underline decoration-sage" : "no-underline hover:underline"}`}
    >
      {children}
    </Link>
  );
}
