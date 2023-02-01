import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { useI18n } from "@shopify/react-i18n";
import { ReactNode } from "react";

export const PolarisProvider = ({ children }: { children: ReactNode }) => {
  const [i18n] = useI18n({
    fallback: da,
    id: "Polaris",
    async translations(locale) {
      return locale === "en" ? en : da;
    },
  });
  return (
    <AppProvider i18n={i18n.locale === "da" ? i18n.translations[0] : i18n.translations[1]}>{children}</AppProvider>
  );
};
