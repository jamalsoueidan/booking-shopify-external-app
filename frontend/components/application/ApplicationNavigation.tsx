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
      title: "Applikation",
      dashboard: "Dashboard",
      bookings: "Behandlingstider",
    },
    staff: {
      title: "Profil",
      schedules: "Vagtplan",
      account: "Konto",
      settings: "Indstillinger",
      logout: "Log ud",
    },
  },
  en: {
    booking: {
      title: "Application",
      dashboard: "Dashboard",
      bookings: "Bookings",
    },
    staff: {
      title: "Profile",
      schedules: "My shift",
      account: "My account",
      settings: "My settings",
      logout: "Logout",
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
            label: t("booking.dashboard"),
            icon: HomeMajor,
            onClick: () => navigate("/admin"),
          },
          {
            label: t("booking.bookings"),
            icon: CalendarTickMajor,
            onClick: () => navigate("/admin/bookings"),
          },
        ]}
      />
      <Navigation.Section
        title={t("staff.title")}
        items={[
          {
            label: t("staff.schedules"),
            icon: CalendarMajor,
            onClick: () => navigate("/admin/schedules"),
          },
          {
            label: t("staff.account"),
            icon: ProfileMajor,
            onClick: () => navigate("/admin/staff"),
          },
          {
            label: t("staff.settings"),
            icon: SettingsMajor,
            onClick: () => navigate("/admin/settings"),
          },
          {
            label: t("staff.logout"),
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
