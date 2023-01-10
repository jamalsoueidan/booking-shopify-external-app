import Translation from "@components/Translation";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import ApplicationRoutes from "ApplicationRoutes";
import { PolarisProvider } from "providers/PolarisProvider";
import { QueryProvider } from "providers/QueryProvider";
import { BrowserRouter } from "react-router-dom";

const i18nManager = new I18nManager({
  locale: "da",
});

export default () => {
  return (
    <I18nContext.Provider value={i18nManager}>
      <BrowserRouter>
        <QueryProvider>
          <PolarisProvider>
            <Translation>
              <ApplicationRoutes />
            </Translation>
          </PolarisProvider>
        </QueryProvider>
      </BrowserRouter>
    </I18nContext.Provider>
  );
};
