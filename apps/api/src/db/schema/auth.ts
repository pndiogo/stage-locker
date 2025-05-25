// import { z } from "zod";
import { z } from "@hono/zod-openapi";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
// import { createSchemaFactory } from "drizzle-zod";

export const emailSchema = z.string().email("Invalid email format");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@, $, !, %, *, ?, &, #)")
  .max(128, "Password must be at most 128 characters long")
  .refine(val => !val.includes(" "), "Password must not contain spaces")
  .refine(val => !val.includes("password"), "Password must not contain the word 'password'");

export const users = sqliteTable("user", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text().unique().notNull(),
  password: text().notNull(),
  verified: integer({ mode: "boolean" })
    .notNull()
    .default(false),
  verificationToken: text(),
  passwordResetToken: text(),
  createdAt: integer({ mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

// const { createSelectSchema, createInsertSchema } = createSchemaFactory({ zodInstance: z });

// export const selectUserSchema = createSelectSchema(users).pick({
//   id: true,
//   email: true,
// });

export const selectUserSchema = z.object({
  id: z.string().uuid(), // Or z.string() if your ID is not necessarily a UUID
  email: emailSchema, // Use your validated emailSchema
});

// export const insertUserSchema = createInsertSchema(users)
//   .pick({
//     email: true,
//     password: true,
//   })
//   .extend({
//     email: emailSchema,
//     password: passwordSchema,
//   });

export const insertUserSchema = z.object({
  email: emailSchema, // emailSchema is from @hono/zod-openapi's z
  password: passwordSchema, // passwordSchema is from @hono/zod-openapi's z
});

// export const loginRequestSchema = createSelectSchema(users)
//   .pick({
//     email: true,
//     password: true,
//   })
//   .extend({
//     email: emailSchema,
//   });

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// export const loginResponseSchema = createSelectSchema(users)
//   .pick({
//     id: true,
//     email: true,
//   })
//   .extend({
//     token: z.string(),
//   });

export const loginResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  token: z.string(),
});
