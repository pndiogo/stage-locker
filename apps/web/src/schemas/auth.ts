import { apiSchemasByTag } from "@stage-locker/types";

export const LoginRequestBodySchema = apiSchemasByTag.Auth.endpoints.postLogin.requestBodySchema;
export const LoginResponseSuccessSchema = apiSchemasByTag.Auth.endpoints.postLogin.responses.successSchema;
