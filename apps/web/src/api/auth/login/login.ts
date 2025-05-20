import type { postLogin_BodyType, postLogin_ResponseType } from "@stage-locker/types";

import { apiClient } from "@stage-locker/api-client";
import { apiSchemasByTag } from "@stage-locker/types";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import { env } from "@/web/env";

type LoginResponseSuccess = postLogin_ResponseType;

type RequestParams<B = unknown, Q = unknown, P = unknown> = {
  body?: B;
  query?: Q;
  path?: P;
};

export async function loginRequest({ body }: RequestParams<postLogin_BodyType>): Promise<LoginResponseSuccess> {
  const parsed = apiSchemasByTag.Auth.endpoints.postLogin.requestBodySchema.safeParse(sanitizeAndTrimObject(body));

  if (!parsed.success) {
    throw new Error(`Invalid input: ${JSON.stringify(parsed.error.flatten())}`);
  }

  const [data, error] = await apiClient<LoginResponseSuccess>(`${env.VITE_API_PATH}/auth/login`, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  }, apiSchemasByTag.Auth.endpoints.postLogin.responses.successSchema);

  if (error) {
    if (error.status === 401) {
      throw new Error("Invalid email or password");
    }
    if (error.status === 403) {
      throw new Error("Account is not activated");
    }
    if (error.status === 404) {
      throw new Error("Account is not found");
    }
    if (error.status === 429) {
      throw new Error("Too many requests, please try again later");
    }
    if (error.status === 500) {
      throw new Error("Server error, please try again later");
    }
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Login failed");
  }

  return data;
}
