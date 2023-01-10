import ApplicationFrame from "@components/application/ApplicationFrame";
import Create from "@pages/create";
import Setting from "@pages/user/setting";
import { SaveBarProvider } from "@providers/saveBar";
import { ToastProvider } from "@providers/toast";
import NotFound from "pages/NotFound";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
import Booking from "pages/booking";
import Dashboard from "pages/dashboard";
import { ProtectedRoute } from "providers/Protected";
import { Route, Routes } from "react-router-dom";

export default () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="phone" element={<Phone />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <ApplicationFrame>
              <SaveBarProvider>
                <ToastProvider>
                  <Dashboard />
                </ToastProvider>
              </SaveBarProvider>
            </ApplicationFrame>
          </ProtectedRoute>
        }
      >
        <Route path="bookings" element={<Booking />} />
        <Route path="create" element={<Create />} />
        <Route path="user/setting" element={<Setting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
