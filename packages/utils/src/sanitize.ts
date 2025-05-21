import DOMPurify from "isomorphic-dompurify";

/**
 * Recursively sanitize and trim all string fields in an object.
 */
export function sanitizeAndTrimObject<T extends Record<string, any>>(obj: T): T {
  const result: Record<string, any> = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      result[key] = DOMPurify.sanitize(value).trim();
    }
    else if (value && typeof value === "object") {
      result[key] = sanitizeAndTrimObject(value);
    }
    else {
      result[key] = value;
    }
  }
  return result as T;
}

/**
 * Sanitize and trim a single string.
 */
export function sanitizeAndTrimString(value: string): string {
  return DOMPurify.sanitize(value).trim();
}
