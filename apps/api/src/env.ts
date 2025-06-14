/* eslint-disable node/no-process-env */
import { z } from "@hono/zod-openapi";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";

expand(config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  ),
}));

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  FRONTEND_URL: z.string().url(),
  BACKEND_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
  JWT_SECRET: z.string(),
  MAILERSEND_API_TOKEN: z.string(),
  MAILERSEND_EMAIL: z.string().email(),
  MAILERSEND_TEMPLATE_1_ID: z.string(),
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "string",
      received: "undefined",
      path: ["DATABASE_AUTH_TOKEN"],
      message: "Must be set when NODE_ENV is 'production'",
    });
  }
});

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log("✅ Valid env");

export default env!;
