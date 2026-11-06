import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { clicks } from "../../db/schema.js";

const MAX_BATCH = 50;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body: any;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const sessionId = clean(body?.sessionId, 64);
  const path = clean(body?.path, 200) || "/";
  const events = Array.isArray(body?.events) ? body.events.slice(0, MAX_BATCH) : [];

  const rows = events
    .map((e: any) => ({
      target: clean(e?.target, 120),
      label: clean(e?.label, 120),
      screen: clean(e?.screen, 60),
      path,
      sessionId,
    }))
    .filter((r: { target: string }) => r.target);

  if (rows.length) await db.insert(clicks).values(rows);
  return new Response(null, { status: 204 });
};

export const config: Config = { path: "/api/track" };
