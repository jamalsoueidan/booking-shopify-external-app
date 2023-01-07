import { I18nContext, I18nManager } from "@shopify/react-i18n";
import NotFound from "pages/NotFound";
import Booking from "pages/application/booking";
import Dashboard from "pages/application/dashboard";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
import Index from "pages/index";
import { AuthProvider } from "providers/AuthProvider";
import { PolarisProvider } from "providers/PolarisProvider";
import { ProtectedRoute } from "providers/Protected";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const i18nManager = new I18nManager({
  locale: "en-US",
});

export default () => {
  return (
    <I18nContext.Provider value={i18nManager}>
      <BrowserRouter>
        <PolarisProvider>
          <AuthProvider>
            <Routes>
              <Route index element={<Login />} />
              <Route path="phone" element={<Phone />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Booking />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </PolarisProvider>
      </BrowserRouter>
    </I18nContext.Provider>
  );
};
