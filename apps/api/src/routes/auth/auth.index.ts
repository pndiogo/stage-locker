import createRouter from "@/api/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.signup, handlers.signup)
  .openapi(routes.login, handlers.login)
  .openapi(routes.verifyEmail, handlers.verifyEmail)
  .openapi(routes.sendVerificationEmailWithId, handlers.sendVerificationEmailWithId)
  .openapi(routes.sendVerificationEmailWithEmail, handlers.sendVerificationEmailWithEmail)
  .openapi(routes.sendPasswordResetEmail, handlers.sendPasswordResetEmail)
  .openapi(routes.resetPassword, handlers.resetPassword)
  .openapi(routes.getUser, handlers.getUser)
  ;
// .openapi(routes.listUsers, handlers.listUsers)

export default router;
