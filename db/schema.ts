import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

export const clicks = pgTable(
  "clicks",
  {
    id: serial().primaryKey(),
    target: text().notNull(),
    label: text().notNull().default(""),
    screen: text().notNull().default(""),
    path: text().notNull().default("/"),
    sessionId: text("session_id").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("clicks_created_at_idx").on(t.createdAt), index("clicks_target_idx").on(t.target)],
);
