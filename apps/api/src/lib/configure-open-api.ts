import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJson from "../../package.json" with { type: "json" };
import { BASE_PATH } from "./constants";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc(`${BASE_PATH}/doc`, {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Stage Locker API V1",
    }
  });

  app.get(
    `${BASE_PATH}/reference`,
    Scalar({
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      url: `${BASE_PATH}/doc`,
    }),
  );
}
