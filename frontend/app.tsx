import { QueryProvider } from "providers/QueryProvider";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import NotFound from "pages/NotFound";
import Booking from "pages/application/booking";
import Dashboard from "pages/application/dashboard";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
import { AuthProvider } from "providers/AuthProvider";
import { PolarisProvider } from "providers/PolarisProvider";
import { ProtectedRoute } from "providers/Protected";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Translation from "@components/Translation";
import Default from "@pages/application/default";
import Create from "@pages/application/create";

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
