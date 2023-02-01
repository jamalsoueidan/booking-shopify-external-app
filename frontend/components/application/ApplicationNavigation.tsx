import { useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
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

const locales = {
  da: {
    booking: {
      bookings: "Behandlingstider",
      dashboard: "Dashboard",
      title: "Applikation",
    },
    staff: {
      account: "Konto",
      logout: "Log ud",
      schedules: "Vagtplan",
      settings: "Indstillinger",
      title: "Profil",
    },
  },
  en: {
    booking: {
      bookings: "Bookings",
      dashboard: "Dashboard",
      title: "Application",
    },
    staff: {
      account: "My account",
      logout: "Logout",
      schedules: "My shift",
      settings: "My settings",
      title: "Profile",
    },
  },
};

export const AppNavigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation({ id: "app-navigation", locales });
  return (
    <Navigation location="/">
      <Navigation.Section
        title={t("booking.title")}
        items={[
          {
            icon: HomeMajor,
            label: t("booking.dashboard"),
            onClick: () => navigate("/admin"),
          },
          {
            icon: CalendarTickMajor,
            label: t("booking.bookings"),
            onClick: () => navigate("/admin/bookings"),
          },
        ]}
      />
      <Navigation.Section
        title={t("staff.title")}
        items={[
          {
            icon: CalendarMajor,
            label: t("staff.schedules"),
            onClick: () => navigate("/admin/schedules"),
          },
          {
            icon: ProfileMajor,
            label: t("staff.account"),
            onClick: () => navigate("/admin/staff"),
          },
          {
            icon: SettingsMajor,
            label: t("staff.settings"),
            onClick: () => navigate("/admin/settings"),
          },
          {
            icon: ExitMajor,
            label: t("staff.logout"),
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
