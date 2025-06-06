import { z } from "@hono/zod-openapi";
import { emailSchema } from "@stage-locker/types";
import { createMiddleware } from "hono/factory";
import * as HttpStatusCodes from "stoker/http-status-codes";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(limit: number, windowMs: number) {
  return createMiddleware(async (c, next) => {
    let body: { email?: string; id?: string } = {};

    try {
      body = await c.req.json();
    }
    catch {
      return c.json(
        { message: "Invalid or missing JSON body" },
        HttpStatusCodes.BAD_REQUEST,
      );
    }

    if (!body.email && !body.id) {
      return c.json(
        { message: "Invalid request body" },
        HttpStatusCodes.BAD_REQUEST,
      );
    }

    const email = body.email || "";
    const id = body.id || "";

    const emailValidation = emailSchema().safeParse(email);
    const idValidation = z.string().safeParse(id);

    if (!emailValidation.success && !idValidation.success) {
      const error = emailValidation.success ? idValidation.error : emailValidation.error;

      return c.json(
        { message: error.errors[0].message },
        HttpStatusCodes.BAD_REQUEST,
      );
    }

    const key = `rate-limit:${email ?? id}`;
    const now = Date.now();

    const entry = rateLimitStore.get(key);

    if (entry) {
      if (entry.resetTime > now) {
        if (entry.count >= limit) {
          return c.json(
            { message: "Rate limit exceeded" },
            HttpStatusCodes.TOO_MANY_REQUESTS,
          );
        }

        entry.count += 1;
      }
      else {
        entry.count = 1;
        entry.resetTime = now + windowMs;
      }
    }
    else {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    }

    await next();
  });
}
