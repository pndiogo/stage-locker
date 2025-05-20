import createRouter from "@/api/lib/create-router";

import type { AppOpenAPI } from "../lib/types";

import { BASE_PATH } from "../lib/constants";
import auth from "./auth/auth.index";
import index from "./index.route";

export function registerRoutes(app: AppOpenAPI) {
  return app
    .route(`${BASE_PATH}/`, index)
    .route(`${BASE_PATH}/`, auth);
}

// stand alone router type used for api client
export const router = registerRoutes(
  createRouter(),
);

export type Router = typeof router;
