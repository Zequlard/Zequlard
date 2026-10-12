import { notFound } from "next/navigation";

// Unmatched paths under a locale render [lang]/not-found.tsx, in that
// language and inside the site layout, instead of the bare default 404.
export default function CatchAll() {
  notFound();
}
