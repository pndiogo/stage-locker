import { createRoute, z } from "@hono/zod-openapi";
import { emailSchema, passwordSchema, tokenSchema } from "@stage-locker/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import { insertUserSchema, loginRequestSchema, loginResponseSchema, selectUserSchema } from "@/api/db/schema/auth";
import { badRequestSchema, forbiddenSchema, internalServerErrorSchema, notFoundSchema, tooManyRequestsSchema, unauthorizedSchema } from "@/api/lib/constants";
import { authenticate, verifyUserStatus } from "@/api/middlewares/authenticate";
import { getLanguage } from "@/api/middlewares/language";
import { rateLimit } from "@/api/middlewares/rate-limit";

const tags = ["Auth"];

export const signup = createRoute({
  method: "post",
  tags,
  path: "/auth/signup",
  operationId: "postSignup",
  description: "Create a new user",
  summary: "Create a new user",
  request: {
    body: jsonContentRequired(
      insertUserSchema,
      "The user to create",
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectUserSchema,
      "The created user",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "User already exists",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

export const verifyEmail = createRoute({
  method: "get",
  tags,
  path: "/auth/verify-email",
  operationId: "postVerifyEmail",
  description: "Verify a user's email",
  summary: "Verify a user's email",
  request: {
    query: z.object({
      token: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]:
    {
      description: "Email verified",
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "Verification token is missing",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Invalid or expired token",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

export const sendVerificationEmail = createRoute({
  method: "post",
  tags,
  path: "/auth/send-verification-email",
  operationId: "postSendVerificationEmail",
  description: "Send a verification email to a user",
  summary: "Send a verification email to a user",
  middleware: [rateLimit(3, 5 * 60 * 1000)], // Limit to 3 requests per 5 minutes
  request: {
    body: jsonContentRequired(IdUUIDParamsSchema, "The user to send the verification email"),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Verification email sent",
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "Email is already verified or invalid",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.TOO_MANY_REQUESTS]: jsonContent(
      tooManyRequestsSchema,
      "Too many requests",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

export const sendPasswordResetEmail = createRoute({
  method: "post",
  tags,
  path: "/auth/send-password-reset-email",
  operationId: "postSendPasswordResetEmail",
  description: "Send a password reset email to a user",
  summary: "Send a password reset email to a user",
  middleware: [rateLimit(3, 5 * 60 * 1000)], // Limit to 3 requests per 5 minutes
  request: {
    body: jsonContentRequired(
      z.object({
        email: emailSchema(),
      }),
      "The user to send the password reset email",
    ),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Password reset email sent",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({
        email: emailSchema(),
      })),
      "The validation error(s)",
    ),
    [HttpStatusCodes.TOO_MANY_REQUESTS]: jsonContent(
      tooManyRequestsSchema,
      "Too many requests",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

export const resetPassword = createRoute({
  method: "post",
  tags,
  path: "/auth/reset-password",
  operationId: "postResetPassword",
  description: "Reset a user's password",
  summary: "Reset a user's password",
  request: {
    body: jsonContentRequired(
      z.object({
        token: tokenSchema(),
        newPassword: passwordSchema(),
      }),
      "The user to reset the password",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Password reset successfully",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Invalid or expired token",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

export const login = createRoute({
  method: "post",
  tags,
  path: "/auth/login",
  operationId: "postLogin",
  description: "Login a user",
  summary: "Login a user",
  middleware: [verifyUserStatus, getLanguage], // TODO Limit to 3 requests per 5 minutes?
  request: {
    body: jsonContentRequired(
      loginRequestSchema,
      "The user to log in",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      loginResponseSchema,
      "The logged in user",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "Invalid request",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Invalid credentials",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      forbiddenSchema,
      "Account is not activated",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(loginRequestSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

export const getUser = createRoute({
  method: "get",
  tags,
  path: "/auth/user/{id}",
  operationId: "getUser",
  description: "Get a user by id",
  summary: "Get a user by id",
  middleware: [authenticate],
  request: {
    params: IdUUIDParamsSchema,
    headers: z.object({
      Authorization: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUserSchema,
      "The requested user",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      forbiddenSchema,
      "Not allowed to access this resource",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Invalid credentials",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Invalid id error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal server error",
    ),
  },
});

// export const listUsers = createRoute({
//   tags,
//   path: "/auth/users",
//   method: "get",
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       z.array(selectUserSchema),
//       "The list of users",
//     ),
//   },
// });

// export const patch = createRoute({
//   tags,
//   path: "/tasks/{id}",
//   method: "patch",
//   request: {
//     params: IdParamsSchema,
//     body: jsonContentRequired(
//       patchTasksSchema,
//       "The task updates",
//     ),
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       selectTasksSchema,
//       "The updated task",
//     ),
//     [HttpStatusCodes.NOT_FOUND]: jsonContent(
//       notFoundSchema,
//       "Task not found",
//     ),
//     [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
//       createErrorSchema(patchTasksSchema)
//         .or(createErrorSchema(IdParamsSchema)),
//       "The validation error(s)",
//     ),
//   },
// });

// export const remove = createRoute({
//   tags,
//   path: "/tasks/{id}",
//   method: "delete",
//   request: {
//     params: IdParamsSchema,
//   },
//   responses: {
//     [HttpStatusCodes.NO_CONTENT]: {
//       description: "Task deleted",
//     },
//     [HttpStatusCodes.NOT_FOUND]: jsonContent(
//       notFoundSchema,
//       "Task not found",
//     ),
//     [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
//       createErrorSchema(IdParamsSchema),
//       "Invalid id error",
//     ),
//   },
// });

export type SignupRoute = typeof signup;
export type LoginRoute = typeof login;
export type VerifyEmailRoute = typeof verifyEmail;
export type SendVerificationEmailRoute = typeof sendVerificationEmail;
export type SendPasswordResetEmailRoute = typeof sendPasswordResetEmail;
export type ResetPasswordRoute = typeof resetPassword;
export type GetUserRoute = typeof getUser;
// export type ListUsersRoute = typeof listUsers;
// export type PatchRoute = typeof patch;
// export type RemoveRoute = typeof remove;
