import type { postLogin_BodyType, postLogin_ResponseType, postSignup_BodyType, postSignup_ResponseType, postVerifyEmail_ParametersType, postVerifyEmail_ResponseType } from "@stage-locker/types";

export type LoginRequestBodyType = postLogin_BodyType;
export type LoginResponseSuccessType = postLogin_ResponseType;

export type SignupRequestBodyType = postSignup_BodyType;
export type SignupResponseSuccessType = postSignup_ResponseType;

export type VerifyEmailRequestQueryType = postVerifyEmail_ParametersType;
export type VerifyEmailResponseSuccessType = postVerifyEmail_ResponseType;
