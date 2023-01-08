import LoadingPage from "@components/LoadingPage";
import { useUserSetting } from "@services/user";
import { I18nContext, I18nManager, useI18n } from "@shopify/react-i18n";
import { useContext, useEffect, useMemo } from "react";
import da from "../translations/da-DK.json";
import en from "../translations/en-US.json";

export default ({ children }: { children: JSX.Element }) => {
  const { data } = useUserSetting();

  const i18nManager = useContext<I18nManager>(I18nContext);
  const language = useMemo(() => data?.language || "da-DK", [data]);

  const [i18n, ShareTranslations] = useI18n({
    id: "Application",
    fallback: en,
    translations(locale: string) {
      return locale === "en-US" ? en : da;
    },
  });

  useEffect(() => {
    i18nManager.update({ locale: language });
  }, []);

  useEffect(() => {
    i18nManager.update({ locale: language });
  }, [language]);

  if (language !== i18n.locale || i18n.translations.length < 2) {
    console.log("loading...");
    return <LoadingPage title="Loading translations"></LoadingPage>;
  }

  return <ShareTranslations>{children}</ShareTranslations>;
};
