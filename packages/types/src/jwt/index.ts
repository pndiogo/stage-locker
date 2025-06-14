export type JWTPayload = {
  exp?: number;
  nbf?: number;
  iat?: number;
  [key: string]: unknown;
};
