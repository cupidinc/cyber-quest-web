CREATE TABLE "clicks" (
	"id" serial PRIMARY KEY,
	"target" text NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"screen" text DEFAULT '' NOT NULL,
	"path" text DEFAULT '/' NOT NULL,
	"session_id" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "clicks_created_at_idx" ON "clicks" ("created_at");--> statement-breakpoint
CREATE INDEX "clicks_target_idx" ON "clicks" ("target");