// /* eslint-disable node/no-process-env */
// import { config } from "dotenv";
// import { expand } from "dotenv-expand";
// import path from "node:path";
// import { z } from "zod";

// const EnvSchema = z.object({
//   LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
//   BACKEND_URL: z.string().url(),
// });

// export type env = z.infer<typeof EnvSchema>;

// // eslint-disable-next-line ts/no-redeclare
// const { data: env, error } = EnvSchema.safeParse(process.env);

// if (error) {
//   console.error("❌ Invalid env:");
//   console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
//   process.exit(1);
// }

// // eslint-disable-next-line no-console
// console.log("✅ Valid env");

// export default env!;

import { z } from "zod";

const EnvSchema = z.object({
  VITE_API_PATH: z.string(),
  VITE_LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
});

const parsed = EnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("❌ Invalid env:");
  console.error(parsed.error.format());
  throw new Error("Invalid frontend environment variables");
}

export const env = parsed.data;
