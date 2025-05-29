import { apiSchemasByTag } from "@stage-locker/types";

export const LoginRequestBodySchema = apiSchemasByTag.Auth.endpoints.postLogin.requestBodySchema;
export const LoginResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postLogin.responses.successSchema;
export const LoginResponseError400Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["400Schema"];
export const LoginResponseError401Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["401Schema"];
export const LoginResponseError403Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["403Schema"];
export const LoginResponseError404Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["404Schema"];
export const LoginResponseError422Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["422Schema"];
export const LoginResponseError500Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["500Schema"];

export const SignupRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSignup.requestBodySchema;
export const SignupResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSignup.responses.successSchema;
export const SignupResponseError400Schema = apiSchemasByTag.Auth.endpoints.postSignup.responses.errors["400Schema"];
export const SignupResponseError422Schema = apiSchemasByTag.Auth.endpoints.postSignup.responses.errors["422Schema"];
export const SignupResponseError500Schema = apiSchemasByTag.Auth.endpoints.postSignup.responses.errors["500Schema"];

export const VerifyEmailRequestQuerySchema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.parametersSchema;
export const VerifyEmailResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.successSchema;
export const VerifyEmailResponseError400Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["400Schema"];
export const VerifyEmailResponseError401Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["401Schema"];
export const VerifyEmailResponseError404Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["404Schema"];
export const VerifyEmailResponseError500Schema = apiSchemasByTag.Auth.endpoints.postVerifyEmail.responses.errors["500Schema"];
