export const supportedLanguages = [
  { code: "en-US", name: "English", shortName: "EN" },
  { code: "pt-PT", name: "Português", shortName: "PT" },
] as const;

export const defaultLanguage = supportedLanguages[0];

export type SupportedLanguages = typeof supportedLanguages[number];
export type SupportedLanguagesCode = SupportedLanguages["code"];
export type SupportedLanguagesName = SupportedLanguages["name"];
export type SupportedLanguagesShortName = SupportedLanguages["shortName"];
