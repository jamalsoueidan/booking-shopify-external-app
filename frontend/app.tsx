import Translation from "@components/Translation";
import Create from "@pages/application/create";
import Default from "@pages/application/default";
import UserSetting from "@pages/application/user/user.setting";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import NotFound from "pages/NotFound";
import Booking from "pages/application/booking";
import Dashboard from "pages/application/dashboard";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
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
              <Routes>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="phone" element={<Phone />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Default />} />
                  <Route path="bookings" element={<Booking />} />
                  <Route path="create" element={<Create />} />
                  <Route path="user/setting" element={<UserSetting />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Translation>
          </PolarisProvider>
        </QueryProvider>
      </BrowserRouter>
    </I18nContext.Provider>
  );
};
