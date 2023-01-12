import ApplicationFrame from "@components/application/ApplicationFrame";
import BookingNew from "@pages/booking/booking.new";
import Create from "@pages/create";
import Schedules from "@pages/schedules";
import Staff from "@pages/staff";
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
        <Route path="bookings/new" element={<BookingNew />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="staff" element={<Staff />} />
        <Route path="user/settings" element={<Setting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
