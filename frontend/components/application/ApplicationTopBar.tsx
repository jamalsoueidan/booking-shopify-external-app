import { Text, usePosition, useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { useStaff } from "@services/staff";
import { TopBar } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const locales = {
  da: {
    logout: "Log ud",
  },
  en: {
    logout: "Log out",
  },
};

export const AppTopBar = ({ toggleNavigation }: any) => {
  const { data } = useStaff();
  const { t } = useTranslation({ id: "app-topbar", locales });
  const { select } = usePosition();
  const navigate = useNavigate();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      toggleNavigation(
        (mobileNavigationActive: boolean) => !mobileNavigationActive
      ),
    []
  );

  const userMenuActions = [
    {
      items: [
        {
          content: t("logout"),
          onAction: () => {
            localStorage.clear();
            return navigate("/");
          },
        },
      ],
    },
  ];

  const userMenuMarkup = data ? (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={data?.fullname.split(" ").map(Text.titlize).join(" ")}
      detail={select(data?.position as any)}
      initials={data?.active ? "A" : "D"}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  ) : null;

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
};
