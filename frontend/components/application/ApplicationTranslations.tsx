import { useI18n } from "@shopify/react-i18n";
import da from "../../translations/da-DK.json";
import en from "../../translations/en-US.json";

//todo: needs to deleted and enpsulate the translations to each file

export const ApplicationTranslations = ({ children }: any) => {
  const [i18n, ShareTranslations] = useI18n({
    id: "Application",
    fallback: da,
    translations(locale: string) {
      return locale === "en" ? en : da;
    },
  });

  return <ShareTranslations>{children}</ShareTranslations>;
};
