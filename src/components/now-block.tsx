import { connection } from "next/server";
import { htmlLang } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getNow } from "@/lib/now";

function daysSince(date: Date) {
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000));
}

// Request-time hole: the data is cached for minutes, but the "days ago"
// line is computed per request, so this always streams after the shell.
export async function NowBlock() {
  await connection();
  const [now, dict, locale] = await Promise.all([getNow(), getDictionary(), getLocale()]);
  const updated = new Date(now.updatedAt);
  const days = daysSince(updated);
  const date = new Intl.DateTimeFormat(htmlLang[locale], { dateStyle: "medium", timeZone: "UTC" });

  return (
    <div>
      <ul className="space-y-3">
        {now.items.map((item) => (
          <li key={item} className="leading-snug">
            {item}
          </li>
        ))}
      </ul>
      <p className="label mt-5">
        {dict.now.updated} {date.format(updated)} · {days === 0 ? dict.now.today : dict.now.daysAgo(days)}
      </p>
    </div>
  );
}

export function NowFallback({ label }: { label: string }) {
  return (
    <div aria-busy="true" className="space-y-3">
      {[80, 64, 72].map((w) => (
        <div key={w} className="bg-hair h-[1.1em]" style={{ width: `${w}%` }} />
      ))}
      <p className="label mt-5">{label}</p>
    </div>
  );
}

// One-line variant for the homepage: still a request-time hole.
export async function NowLine() {
  await connection();
  const now = await getNow();
  return <span className="normal-case">{now.items[0]}</span>;
}
