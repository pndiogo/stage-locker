import { apiSchemasByTag } from "@stage-locker/types";

export const LoginRequestBodySchema = apiSchemasByTag.Auth.endpoints.postLogin.requestBodySchema;
export const LoginResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postLogin.responses.successSchema;
export const LoginResponseError400Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["400Schema"];
export const LoginResponseError401Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["401Schema"];
export const LoginResponseError403Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["403Schema"];
export const LoginResponseError404Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["404Schema"];
export const LoginResponseError422Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["422Schema"];
export const LoginResponseError500Schema = apiSchemasByTag.Auth.endpoints.postLogin.responses.errors["500Schema"];

export const RegisterRequestBodySchema = apiSchemasByTag.Auth.endpoints.postSignup.requestBodySchema;
export const RegisterResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postSignup.responses.successSchema;
