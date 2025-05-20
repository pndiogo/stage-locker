import { requestId } from "hono/request-id";
import { notFound, onError } from "stoker/middlewares";

import { pinoLogger } from "@/api/middlewares/pino-logger";

import createRouter from "./create-router";

export default function createApp() {
  const app = createRouter();

  app
    .use(requestId())
    .use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
