import type { postLogin_BodyType, postLogin_ResponseType, postSignup_BodyType, postSignup_ResponseType } from "@stage-locker/types";

export type LoginRequestBody = postLogin_BodyType;
export type LoginResponseSuccess = postLogin_ResponseType;

export type RegisterRequestBody = postSignup_BodyType;
export type RegisterResponseSuccess = postSignup_ResponseType;
