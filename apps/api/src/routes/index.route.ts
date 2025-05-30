import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import createRouter from "@/api/lib/create-router";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      path: "/",
      method: "get",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Stage Locker API"),
          "Stage Locker API Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Stage Locker API",
      }, HttpStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      tags: ["Health"],
      path: "/health",
      method: "get",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Health Check"),
          "Health Check Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Health Check",
      }, HttpStatusCodes.OK);
    },
  );

export default router;
