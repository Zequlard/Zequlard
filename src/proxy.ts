import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookie, type Locale } from "@/i18n/config";

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (isLocale(saved)) return saved;

  const accept = request.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag.startsWith("zh")) return "zh";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (isLocale(first)) {
    // Remember a manual switch, but only write the cookie when it changes,
    // so cached pages are not served with a Set-Cookie on every hit.
    if (request.cookies.get(localeCookie)?.value === first) return;
    const response = NextResponse.next();
    response.cookies.set(localeCookie, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip internals, the API, and anything that looks like a file.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

