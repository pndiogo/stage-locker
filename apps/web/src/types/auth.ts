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
export const GetVerifyEmailRequestQuerySchema = apiSchemasByTag.Auth.endpoints.getVerifyEmail.parametersSchema;
export const GetVerifyEmailResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.getVerifyEmail.responses.successSchema;
export const GetVerifyEmailResponseError400Schema = apiSchemasByTag.Auth.endpoints.getVerifyEmail.responses.errors["400Schema"];
export const GetVerifyEmailResponseError401Schema = apiSchemasByTag.Auth.endpoints.getVerifyEmail.responses.errors["401Schema"];
export const GetVerifyEmailResponseError404Schema = apiSchemasByTag.Auth.endpoints.getVerifyEmail.responses.errors["404Schema"];
export const GetVerifyEmailResponseError500Schema = apiSchemasByTag.Auth.endpoints.getVerifyEmail.responses.errors["500Schema"];

export type GetVerifyEmailRequestQueryType = z.infer<typeof GetVerifyEmailRequestQuerySchema>;
export type GetVerifyEmailResponseSuccessType = z.infer<typeof GetVerifyEmailResponseSuccessSchema>;

// Send Verification Email With Id
export const PostSendVerificationEmailWithIdRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.requestBodySchema;
export const PostSendVerificationEmailWithIdResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.responses.successSchema;
export const PostSendVerificationEmailWithIdResponseError400Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.responses.errors["400Schema"];
export const PostSendVerificationEmailWithIdResponseError404Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.responses.errors["404Schema"];
export const PostSendVerificationEmailWithIdResponseError422Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.responses.errors["422Schema"];
export const PostSendVerificationEmailWithIdResponseError429Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.responses.errors["429Schema"];
export const PostSendVerificationEmailWithIdResponseError500Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithId.responses.errors["500Schema"];

export type PostSendVerificationEmailWithIdRequestBodyType = z.infer<typeof PostSendVerificationEmailWithIdRequestBodySchema>;
export type PostSendVerificationEmailWithIdResponseSuccessType = z.infer<typeof PostSendVerificationEmailWithIdResponseSuccessSchema>;

// Send Verification Email With Email
export const PostSendVerificationEmailWithEmailRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.requestBodySchema;
export const PostSendVerificationEmailWithEmailResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.responses.successSchema;
export const PostSendVerificationEmailWithEmailResponseError400Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.responses.errors["400Schema"];
export const PostSendVerificationEmailWithEmailResponseError404Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.responses.errors["404Schema"];
export const PostSendVerificationEmailWithEmailResponseError422Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.responses.errors["422Schema"];
export const PostSendVerificationEmailWithEmailResponseError429Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.responses.errors["429Schema"];
export const PostSendVerificationEmailWithEmailResponseError500Schema = apiSchemasByTag.Auth.endpoints.postSendVerificationEmailWithEmail.responses.errors["500Schema"];

export type PostSendVerificationEmailWithEmailRequestBodyType = z.infer<typeof PostSendVerificationEmailWithEmailRequestBodySchema>;
export type PostSendVerificationEmailWithEmailResponseSuccessType = z.infer<typeof PostSendVerificationEmailWithEmailResponseSuccessSchema>;

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
