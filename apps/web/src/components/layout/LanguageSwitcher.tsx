import { supportedLanguages } from "@stage-locker/types";
import { useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/web/components/ui/select";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = async (language: string) => {
    await i18n.changeLanguage(language);
    setCurrentLanguage(language);
    router.invalidate();
  };

  return (
    <Select
      onValueChange={handleLanguageChange}
      defaultValue={currentLanguage}
      value={currentLanguage}
    >
      <SelectTrigger className="gap-2">
        <Globe />
        <SelectValue placeholder={t("languageSwitcher.selectLanguage")} />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map(lang => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.shortName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { LanguageSwitcher };
