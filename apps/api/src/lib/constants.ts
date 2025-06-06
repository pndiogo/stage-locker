import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const BASE_PATH = "/api/v1" as const;

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);

export const badRequestSchema = createMessageObjectSchema(HttpStatusPhrases.BAD_REQUEST);

export const forbiddenSchema = createMessageObjectSchema(HttpStatusPhrases.FORBIDDEN);

export const unauthorizedSchema = createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED);

export const internalServerErrorSchema = createMessageObjectSchema(HttpStatusPhrases.INTERNAL_SERVER_ERROR);

export const tooManyRequestsSchema = createMessageObjectSchema(HttpStatusPhrases.TOO_MANY_REQUESTS);
