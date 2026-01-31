import { Language } from "@/i18n";

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  pt: "pt-BR",
  en: "en-US",
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const formatDate = (date: Date, language: Language) => {
  const locale = LOCALE_BY_LANGUAGE[language];

  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
  });

  const parts = formatter.formatToParts(date);

  const weekday = capitalize(
    parts.find(part => part.type === "weekday")?.value ?? ""
  );

  const month = capitalize(
    parts.find(part => part.type === "month")?.value ?? ""
  );

  const day = date.getDate();
  const year = date.getFullYear();

  if (language === "pt") {
    return `${weekday}, ${day} de ${month}, ${year}`;
  }

  return `${weekday}, ${day} ${month}, ${year}`;
};
