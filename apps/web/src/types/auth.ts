import type { z } from "zod";

import { apiSchemasByTag } from "@stage-locker/types";

// Login
export const PostLoginRequestBodySchema = apiSchemasByTag.Auth.endpoints.postLogin.requestBodySchema;
export const PostLoginResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postLogin.responses.successSchema;
export const PostLoginResponseError400Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["400Schema"];
export const PostLoginResponseError401Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["401Schema"];
export const PostLoginResponseError403Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["403Schema"];
export const PostLoginResponseError404Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["404Schema"];
export const PostLoginResponseError422Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["422Schema"];
export const PostLoginResponseError500Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["500Schema"];

export type PostLoginRequestBodyType = z.infer<typeof PostLoginRequestBodySchema>;
export type PostLoginResponseSuccessType = z.infer<typeof PostLoginResponseSuccessSchema>;

// Signup
export const PostSignupRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSignup.requestBodySchema;
export const PostSignupResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSignup.responses.successSchema;
export const PostSignupResponseError400Schema = apiSchemasByTag.Auth.endpoints.postSignup.responses.errors["400Schema"];
export const PostSignupResponseError422Schema = apiSchemasByTag.Auth.endpoints.postSignup.responses.errors["422Schema"];
export const PostSignupResponseError500Schema = apiSchemasByTag.Auth.endpoints.postSignup.responses.errors["500Schema"];

export type PostSignupRequestBodyType = z.infer<typeof PostSignupRequestBodySchema>;
export type PostSignupResponseSuccessType = z.infer<typeof PostSignupResponseSuccessSchema>;

// Verify Email
export const PostVerifyEmailRequestQuerySchema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.parametersSchema;
export const PostVerifyEmailResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.successSchema;
export const PostVerifyEmailResponseError400Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["400Schema"];
export const PostVerifyEmailResponseError401Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["401Schema"];
export const PostVerifyEmailResponseError404Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["404Schema"];
export const PostVerifyEmailResponseError500Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["500Schema"];

export type PostVerifyEmailRequestQueryType = z.infer<typeof PostVerifyEmailRequestQuerySchema>;
export type PostVerifyEmailResponseSuccessType = z.infer<typeof PostVerifyEmailResponseSuccessSchema>;

// Send Verification Email
export const PostSendVerificationEmailRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.requestBodySchema;
export const PostSendVerificationEmailResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.responses.successSchema;
export const PostSendVerificationEmailResponseError400Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.responses.errors["400Schema"];
export const PostSendVerificationEmailResponseError404Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.responses.errors["404Schema"];
export const PostSendVerificationEmailResponseError422Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.responses.errors["422Schema"];
export const PostSendVerificationEmailResponseError429Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.responses.errors["429Schema"];
export const PostSendVerificationEmailResponseError500Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmail.responses.errors["500Schema"];

export type PostSendVerificationEmailRequestBodyType = z.infer<typeof PostSendVerificationEmailRequestBodySchema>;
export type PostSendVerificationEmailResponseSuccessType = z.infer<typeof PostSendVerificationEmailResponseSuccessSchema>;

// Send Password Reset Email
export const PostSendPasswordResetEmailRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSendPasswordResetEmail.requestBodySchema;
export const PostSendPasswordResetEmailResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSendPasswordResetEmail.responses.successSchema;
export const PostSendPasswordResetEmailResponseError422Schema = apiSchemasByTag.Auth.endpoints.postSendPasswordResetEmail.responses.errors["422Schema"];
export const PostSendPasswordResetEmailResponseError429Schema = apiSchemasByTag.Auth.endpoints.postSendPasswordResetEmail.responses.errors["429Schema"];
export const PostSendPasswordResetEmailResponseError500Schema = apiSchemasByTag.Auth.endpoints.postSendPasswordResetEmail.responses.errors["500Schema"];

export type PostSendPasswordResetEmailRequestBodyType = z.infer<typeof PostSendPasswordResetEmailRequestBodySchema>;
export type PostSendPasswordResetEmailResponseSuccessType = z.infer<typeof PostSendPasswordResetEmailResponseSuccessSchema>;

// Reset Password
export const PostResetPasswordRequestBodySchema = apiSchemasByTag.Auth.endpoints.postResetPassword.requestBodySchema;
export const PostResetPasswordResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postResetPassword.responses.successSchema;
export const PostResetPasswordResponseError401Schema = apiSchemasByTag.Auth.endpoints.postResetPassword.responses.errors["401Schema"];
export const PostResetPasswordResponseError404Schema = apiSchemasByTag.Auth.endpoints.postResetPassword.responses.errors["404Schema"];
export const PostResetPasswordResponseError422Schema = apiSchemasByTag.Auth.endpoints.postResetPassword.responses.errors["422Schema"];
export const PostResetPasswordResponseError500Schema = apiSchemasByTag.Auth.endpoints.postResetPassword.responses.errors["500Schema"];

export type PostResetPasswordRequestBodyType = z.infer<typeof PostResetPasswordRequestBodySchema>;
export type PostResetPasswordResponseSuccessType = z.infer<typeof PostResetPasswordResponseSuccessSchema>;
