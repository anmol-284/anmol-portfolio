import { NextRequest } from "next/server";

/* Live LeetCode submission calendar via the public GraphQL endpoint.
   GET /api/leetcode?u=<username>&year=2024
   Uses the year-specific userCalendar field so any year's data is accessible.
   Returns { ok, map: {YYYY-MM-DD: count}, total } */
const QUERY = `
  query userCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
      submitStats { acSubmissionNum { difficulty count } }
    }
  }`;

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("u");
  const year = req.nextUrl.searchParams.get("year");
  if (!username) {
    return Response.json({ ok: false, error: "missing username" }, { status: 400 });
  }

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 portfolio",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username, year: year ? Number(year) : null },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`lc ${res.status}`);
    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) throw new Error("user not found");

    const raw = user.userCalendar?.submissionCalendar || "{}";
    const calendar: Record<string, number> = JSON.parse(raw);

    const map: Record<string, number> = {};
    for (const [ts, count] of Object.entries(calendar)) {
      // LeetCode timestamps are UTC midnight for that day
      const day = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
      map[day] = (map[day] ?? 0) + Number(count);
    }

    const total =
      user.submitStats?.acSubmissionNum?.find(
        (x: { difficulty: string; count: number }) => x.difficulty === "All"
      )?.count ?? 0;

    return Response.json({ ok: true, map, total });
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 }
    );
  }
}
