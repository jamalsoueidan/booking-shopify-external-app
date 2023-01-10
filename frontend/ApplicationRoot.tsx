import Translation from "@components/Translation";
import ApplicationFrame from "@components/application/ApplicationFrame";
import Create from "@pages/create";
import UserSetting from "@pages/user/user.setting";
import { SaveBarProvider } from "@providers/saveBar";
import { ToastProvider } from "@providers/toast";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import ApplicationRoutes from "ApplicationRoutes";
import NotFound from "pages/NotFound";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
import Booking from "pages/booking";
import Dashboard from "pages/dashboard";
import { PolarisProvider } from "providers/PolarisProvider";
import { ProtectedRoute } from "providers/Protected";
import { QueryProvider } from "providers/QueryProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
