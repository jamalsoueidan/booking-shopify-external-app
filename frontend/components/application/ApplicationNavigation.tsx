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
            onClick: () => navigate("/dashboard"),
          },
          {
            label: "Bookings",
            icon: CalendarTickMajor,
            onClick: () => navigate("/dashboard/bookings"),
          },
        ]}
      />
      <Navigation.Section
        title="Staff"
        items={[
          {
            label: "Schedules",
            icon: CalendarMajor,
            onClick: () => navigate("/dashboard/schedules"),
          },
          {
            label: "Min side",
            icon: ProfileMajor,
            onClick: () => navigate("/dashboard/staff"),
          },
          {
            label: "Indstillinger",
            icon: SettingsMajor,
            onClick: () => navigate("/dashboard/settings"),
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
