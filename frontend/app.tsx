import { I18nContext, I18nManager } from "@shopify/react-i18n";
import Routes from "Routes";
import { PolarisProvider } from "providers/PolarisProvider";
import { BrowserRouter } from "react-router-dom";

const i18nManager = new I18nManager({
  locale: "en-US",
});

export default () => {
  return (
    <I18nContext.Provider value={i18nManager}>
      <BrowserRouter>
        <PolarisProvider>
          <Routes />
        </PolarisProvider>
      </BrowserRouter>
    </I18nContext.Provider>
  );
};
