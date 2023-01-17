import LoadingPage from "@components/LoadingPage";
import ApplicationFrame from "@components/application/ApplicationFrame";
import BookingNew from "@pages/booking/booking.new";
import Schedules from "@pages/schedules";
import Staff from "@pages/staff";
import Setting from "@pages/user/setting";
import { SaveBarProvider } from "@providers/saveBar";
import { ToastProvider } from "@providers/toast";
import NotFound from "pages/NotFound";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
import Dashboard from "pages/dashboard";
import { ProtectedRoute } from "providers/Protected";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Booking = lazy(() => import("pages/booking"));

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
        <Route
          path="bookings"
          element={
            <Suspense fallback={<LoadingPage title="Loading bookings" />}>
              <Booking />
            </Suspense>
          }
        />
        <Route path="bookings/new" element={<BookingNew />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="staff" element={<Staff />} />
        <Route path="user/settings" element={<Setting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
