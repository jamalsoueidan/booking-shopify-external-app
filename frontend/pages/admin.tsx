import ApplicationFrame from "@components/application/ApplicationFrame";
import { LoadingPage, SaveBarProvider, ToastProvider } from "@jamalsoueidan/pkg.bsf";
import { useAccountSetting } from "@services/account";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("pages/dashboard"));
const Booking = lazy(() => import("pages/booking"));
const MySchedules = lazy(() => import("pages/my/schedules"));
const BookingNew = lazy(() => import("pages/booking/booking.new"));
const MySettings = lazy(() => import("pages/my/settings"));
const MyAccount = lazy(() => import("pages/my/account"));
const Staff = lazy(() => import("pages/staff"));
const StaffCreate = lazy(() => import("pages/staff/new"));
const StaffEdit = lazy(() => import("pages/staff/edit"));
const StaffView = lazy(() => import("pages/staff/view"));

export default () => {
  // force fetching userSetting so application change language! until another solution
  useAccountSetting();

  return (
    <ApplicationFrame>
      <SaveBarProvider>
        <ToastProvider>
          <Suspense fallback={<LoadingPage title="Loading page..." />}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="bookings/new" element={<BookingNew />} />
              <Route path="bookings/*" element={<Booking />} />
              <Route path="bookings/*" element={<Booking />} />
              <Route path="staff" element={<Staff />} />
              <Route path="staff/new" element={<StaffCreate />} />
              <Route path="staff/edit/:id" element={<StaffEdit />} />
              <Route path="staff/:id" element={<StaffView />} />
              <Route path="my/schedules" element={<MySchedules />} />
              <Route path="my/account" element={<MyAccount />} />
              <Route path="my/settings" element={<MySettings />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </SaveBarProvider>
    </ApplicationFrame>
  );
};
