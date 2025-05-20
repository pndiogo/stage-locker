import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { InferSelectModel } from "drizzle-orm";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";

import type { users } from "@/api/db/schema/auth";

export type User = InferSelectModel<typeof users>;

export interface AppEnv {
  Variables: {
    logger: PinoLogger;
    user: User;
  };
};

// eslint-disable-next-line ts/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppEnv, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
