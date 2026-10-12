import { revalidateTag } from "next/cache";

// POST /api/revalidate { "tag": "work:zequlard" } with Authorization: Bearer $REVALIDATE_SECRET
// Allowed tags: work, work:<slug>, now.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const { tag } = (await request.json().catch(() => ({}))) as { tag?: unknown };
  if (typeof tag !== "string" || !/^(work(:[a-z0-9-]+)?|now)$/.test(tag)) {
    return Response.json({ ok: false, error: "Unknown tag" }, { status: 400 });
  }

  revalidateTag(tag, "max");
  return Response.json({ ok: true, tag });
}
