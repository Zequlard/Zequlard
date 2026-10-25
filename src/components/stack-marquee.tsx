import Link from "next/link";
import { stack } from "@/content/stack";

// Two bands of tool names drifting in opposite directions, the whole thing a
// link to /stack. Pure CSS: no script, pauses on hover, and lies still as a
// wrapped list when the reader prefers reduced motion.
const rows = [
  stack.filter((entry) => entry.area === "framework" || entry.area === "data"),
  stack.filter((entry) => entry.area === "infra" || entry.area === "craft"),
];

export function StackMarquee({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="marquee-band group hairline -mx-5 block min-w-0 overflow-hidden border-y py-5 no-underline sm:-mx-8 lg:-mx-12"
    >
      <span className="label block px-5 pb-4 sm:px-8 lg:px-12">
        {label}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
      {rows.map((row, i) => (
        <div
          key={i}
          className="marquee py-2"
          data-reverse={i % 2 ? "" : undefined}
          style={{ "--duration": `${row.length * 5}s` } as React.CSSProperties}
        >
          <Track names={row.map((entry) => entry.name)} />
          <Track names={row.map((entry) => entry.name)} hidden />
        </div>
      ))}
    </Link>
  );
}

function Track({ names, hidden }: { names: string[]; hidden?: boolean }) {
  return (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {names.map((name) => (
        <li
          key={name}
          className="flex items-baseline gap-[1.25em] text-step-2 leading-none font-light whitespace-nowrap transition-colors group-hover:text-paper"
        >
          <span>{name}</span>
          <span className="text-sage text-step--1" aria-hidden="true">
            ●
          </span>
        </li>
      ))}
    </ul>
  );
}
