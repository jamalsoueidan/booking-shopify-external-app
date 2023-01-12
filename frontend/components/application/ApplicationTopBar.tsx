import { usePositions } from "@hooks";
import { useStaff } from "@services/staff";
import { TopBar } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppTopBar = ({ toggleNavigation }: any) => {
  const { data } = useStaff();
  const { select } = usePositions();
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
          content: "Log ud",
          onAction: () => {
            localStorage.clear();
            return navigate("/");
          },
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={data?.fullname}
      detail={select(data?.position)}
      initials={data?.active ? "A" : "D"}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
};
