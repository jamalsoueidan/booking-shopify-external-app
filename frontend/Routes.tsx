import { LoadingPage } from "@jamalsoueidan/bsf.bsf-pkg";
import NotFound from "pages/NotFound";
import { ProtectedRoute } from "providers/Protected";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("pages/dashboard"));
const Booking = lazy(() => import("pages/booking"));
const Schedules = lazy(() => import("pages/schedules"));
const BookingNew = lazy(() => import("pages/booking/booking.new"));
const Setting = lazy(() => import("pages/setting"));
const Staff = lazy(() => import("pages/staff"));
const Login = lazy(() => import("pages/auth/login"));
const Phone = lazy(() => import("pages/auth/phone"));
const Auth = lazy(() => import("pages/auth/auth"));

export default () => {
  return (
    <Suspense fallback={<LoadingPage title="Loading page..." />}>
      <Routes>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="bookings" element={<Booking />} />
          <Route path="bookings/new" element={<BookingNew />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="staff" element={<Staff />} />
          <Route path="settings" element={<Setting />} />
        </Route>
        <Route path="/" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="phone" element={<Phone />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
