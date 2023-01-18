import { ApplicationTranslations } from "@components/application/ApplicationTranslations";
import { useSetting } from "@hooks/useSetting";
import { I18nContext } from "@shopify/react-i18n";
import ApplicationRoutes from "ApplicationRoutes";
import { PolarisProvider } from "providers/PolarisProvider";
import { BrowserRouter } from "react-router-dom";

export default () => {
  const i18nManager = useSetting();
  return (
    <I18nContext.Provider value={i18nManager}>
      <BrowserRouter>
        <PolarisProvider>
          <ApplicationTranslations>
            <ApplicationRoutes />
          </ApplicationTranslations>
        </PolarisProvider>
      </BrowserRouter>
    </I18nContext.Provider>
  );
};
