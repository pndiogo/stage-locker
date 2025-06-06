import { z } from "zod";

export type PasswordMessages = Partial<{
  min: string;
  uppercase: string;
  lowercase: string;
  number: string;
  special: string;
  max: string;
  noSpaces: string;
  noPassword: string;
}>;

export type EmailMessages = Partial<{
  invalid: string;
}>;

export type TokenMessages = Partial<{
  min: string;
}>;

const defaultTokenMessages = {
  min: "Token is required",
};

const defaultPasswordMessages = {
  min: "Password must be at least 8 characters long",
  uppercase: "Password must contain at least one uppercase letter",
  lowercase: "Password must contain at least one lowercase letter",
  number: "Password must contain at least one number",
  special: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
  max: "Password must be at most 128 characters long",
  noSpaces: "Password must not contain spaces",
  noPassword: "Password must not contain the word 'password'",
};

const defaultEmailMessages = {
  invalid: "Missing email or invalid email format",
};

export function emailSchema(messages: EmailMessages = {}) {
  const merged = { ...defaultEmailMessages, ...messages };
  return z.string().email(merged.invalid);
}

export function passwordSchema(messages: PasswordMessages = {}) {
  const merged = { ...defaultPasswordMessages, ...messages };
  return z
    .string()
    .min(8, merged.min)
    .regex(/[A-Z]/, merged.uppercase)
    .regex(/[a-z]/, merged.lowercase)
    .regex(/\d/, merged.number)
    .regex(/[@$!%*?&#]/, merged.special)
    .max(128, merged.max)
    .refine(val => !val.includes(" "), merged.noSpaces)
    .refine(val => !val.includes("password"), merged.noPassword);
}

export function tokenSchema(messages: TokenMessages = {}) {
  const merged = { ...defaultTokenMessages, ...messages };
  return z.string().min(1, merged.min);
}
