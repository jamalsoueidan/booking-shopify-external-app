import ApplicationFrame from "@components/application/ApplicationFrame";
import {
  LoadingPage,
  SaveBarProvider,
  ToastProvider,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { useUserSetting } from "@services/user";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("pages/dashboard"));
const Booking = lazy(() => import("pages/booking"));
const Schedules = lazy(() => import("pages/schedules"));
const BookingNew = lazy(() => import("pages/booking/booking.new"));
const Setting = lazy(() => import("pages/setting"));
const Staff = lazy(() => import("pages/staff"));

export default () => {
  // force fetching userSetting so application change language! until another solution
  useUserSetting();

  return (
    <ApplicationFrame>
      <SaveBarProvider>
        <ToastProvider>
          <Suspense fallback={<LoadingPage title="Loading page..." />}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="bookings/new" element={<BookingNew />} />
              <Route path="bookings/*" element={<Booking />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="staff" element={<Staff />} />
              <Route path="settings" element={<Setting />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </SaveBarProvider>
    </ApplicationFrame>
  );
};
