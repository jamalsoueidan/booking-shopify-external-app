import { HelperText, usePosition, useTranslation } from "@jamalsoueidan/pkg.bsf";
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

interface AppTopBarProps {
  toggleNavigation: (value: unknown) => void;
}

export const AppTopBar = ({ toggleNavigation }: AppTopBarProps) => {
  const { data } = useStaff();
  const { t } = useTranslation({ id: "app-topbar", locales });
  const { selectPosition } = usePosition();
  const navigate = useNavigate();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(() => setUserMenuActive((userMenuActive) => !userMenuActive), []);
  const toggleMobileNavigationActive = useCallback(
    () => toggleNavigation((mobileNavigationActive: boolean) => !mobileNavigationActive),
    [toggleNavigation],
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
      name={data?.fullname.split(" ").map(HelperText.titlize).join(" ")}
      detail={selectPosition(data?.position)}
      initials={data?.active ? "A" : "D"}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  ) : null;

  return <TopBar showNavigationToggle userMenu={userMenuMarkup} onNavigationToggle={toggleMobileNavigationActive} />;
};
