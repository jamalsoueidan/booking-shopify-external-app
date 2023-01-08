import { useStaff } from "@services/user";
import { Frame } from "@shopify/polaris";
import { AppNavigation } from "components/AppNavigation";
import { AppTopBar } from "components/AppTopBar";
import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../logo.svg";

export default () => {
  const { data } = useStaff();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const logoOptions = {
    width: 124,
    topBarSource: logo,
    contextualSaveBarSource: data?.avatar,
    url: "http://jadedpixel.com",
    accessibilityLabel: data?.fullname,
  };

  return (
    <Frame
      logo={logoOptions}
      topBar={<AppTopBar toggleNavigation={setMobileNavigationActive} />}
      navigation={<AppNavigation />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <Outlet />
    </Frame>
  );
};
