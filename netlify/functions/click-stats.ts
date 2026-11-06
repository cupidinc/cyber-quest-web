import type { Config } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { sql, desc, gte, count, countDistinct } from "drizzle-orm";
import { db } from "../../db/index.js";
import { clicks } from "../../db/schema.js";

function authorized(req: Request) {
  const expected = Netlify.env.get("DASHBOARD_PASSWORD");
  const given = req.headers.get("x-dashboard-key") ?? "";
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async (req: Request) => {
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405 });
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const days = Math.min(Math.max(parseInt(url.searchParams.get("days") ?? "30", 10) || 30, 1), 365);
  const since = new Date(Date.now() - days * 86_400_000);
  const prevSince = new Date(since.getTime() - days * 86_400_000);
  const inRange = gte(clicks.createdAt, since);

  // Hourly buckets for the 24h view, daily buckets otherwise (UTC).
  const day =
    days === 1
      ? sql<string>`to_char(date_trunc('hour', ${clicks.createdAt} at time zone 'UTC'), 'YYYY-MM-DD"T"HH24')`
      : sql<string>`to_char(date_trunc('day', ${clicks.createdAt} at time zone 'UTC'), 'YYYY-MM-DD')`;

  const [[totals], [prev], [allTime], daily, top, screens, recent] = await Promise.all([
    db.select({ clicks: count(), sessions: countDistinct(clicks.sessionId) }).from(clicks).where(inRange),
    db
      .select({ clicks: count(), sessions: countDistinct(clicks.sessionId) })
      .from(clicks)
      .where(sql`${clicks.createdAt} >= ${prevSince} and ${clicks.createdAt} < ${since}`),
    db.select({ clicks: count() }).from(clicks),
    db.select({ day, clicks: count() }).from(clicks).where(inRange).groupBy(day).orderBy(day),
    db
      .select({ target: clicks.target, label: sql<string>`max(${clicks.label})`, clicks: count() })
      .from(clicks)
      .where(inRange)
      .groupBy(clicks.target)
      .orderBy(desc(count()))
      .limit(12),
    db
      .select({ screen: clicks.screen, clicks: count() })
      .from(clicks)
      .where(inRange)
      .groupBy(clicks.screen)
      .orderBy(desc(count())),
    db
      .select({ target: clicks.target, label: clicks.label, screen: clicks.screen, createdAt: clicks.createdAt })
      .from(clicks)
      .orderBy(desc(clicks.createdAt))
      .limit(25),
  ]);

  return Response.json(
    { days, totals, previous: prev, allTime: allTime.clicks, daily, top, screens, recent },
    { headers: { "cache-control": "no-store" } },
  );
};

export const config: Config = { path: "/api/click-stats" };
