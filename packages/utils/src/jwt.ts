import type { JWTPayload } from "@stage-locker/types";

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    return window.atob(str);
  }

  // eslint-disable-next-line node/prefer-global/buffer
  return Buffer.from(str, "base64").toString("utf-8");
}

export function decodeJwt(token: string): JWTPayload {
  const [, payload] = token.split(".");
  return JSON.parse(base64UrlDecode(payload)) as JWTPayload;
}
