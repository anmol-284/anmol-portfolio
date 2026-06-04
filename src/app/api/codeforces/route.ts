import { NextRequest } from "next/server";

/* Live Codeforces submission activity via the public API.
   GET /api/codeforces?handle=<handle>
   Returns { ok, map: {YYYY-MM-DD: count}, total } */
export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle");
  if (!handle) {
    return Response.json({ ok: false, error: "missing handle" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=10000`,
      { next: { revalidate: 3600 }, headers: { "User-Agent": "portfolio" } }
    );
    if (!res.ok) throw new Error(`cf ${res.status}`);
    const json = await res.json();
    if (json.status !== "OK") throw new Error(json.comment || "cf error");

    const map: Record<string, number> = {};
    const solved = new Set<string>();
    for (const sub of json.result as Array<{
      creationTimeSeconds: number;
      verdict?: string;
      problem?: { contestId?: number; index?: string };
    }>) {
      const day = new Date(sub.creationTimeSeconds * 1000).toISOString().slice(0, 10);
      map[day] = (map[day] ?? 0) + 1;
      if (sub.verdict === "OK" && sub.problem) {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    }

    return Response.json({ ok: true, map, total: solved.size });
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 }
    );
  }
}
