import type { SupportedLanguagesCode } from "@stage-locker/types";

import { defaultLanguage, supportedLanguages } from "@stage-locker/types";
import { accepts } from "hono/accepts";
import { createMiddleware } from "hono/factory";

export const getLanguage = createMiddleware<{
  Variables: {
    language: SupportedLanguagesCode;
  };
}>(async (c, next) => {
  const language = accepts(c, {
    header: "Accept-Language",
    supports: supportedLanguages.map(lang => lang.code),
    default: defaultLanguage.code,
  }) as SupportedLanguagesCode;

  c.set("language", language);

  await next();
});
