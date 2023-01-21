import { Navigation } from "@shopify/polaris";
import {
  CalendarMajor,
  CalendarTickMajor,
  ExitMajor,
  HomeMajor,
  ProfileMajor,
  SettingsMajor,
} from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";

export const AppNavigation = () => {
  const navigate = useNavigate();
  return (
    <Navigation location="/">
      <Navigation.Section
        title="Booking"
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: () => navigate("/admin/dashboard"),
          },
          {
            label: "Bookings",
            icon: CalendarTickMajor,
            onClick: () => navigate("/admin/bookings"),
          },
        ]}
      />
      <Navigation.Section
        title="Staff"
        items={[
          {
            label: "Schedules",
            icon: CalendarMajor,
            onClick: () => navigate("/admin/schedules"),
          },
          {
            label: "Min side",
            icon: ProfileMajor,
            onClick: () => navigate("/admin/staff"),
          },
          {
            label: "Indstillinger",
            icon: SettingsMajor,
            onClick: () => navigate("/admin/settings"),
          },
          {
            label: "Log af",
            icon: ExitMajor,
            onClick: () => {
              localStorage.clear();
              return navigate("/");
            },
          },
        ]}
      />
    </Navigation>
  );
};
