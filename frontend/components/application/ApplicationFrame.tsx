import { Frame } from "@shopify/polaris";
import { AppNavigation } from "./ApplicationNavigation";
import { AppTopBar } from "./ApplicationTopBar";
import { useCallback, useState } from "react";
import logo from "../../assets/logo.avif";

export default ({ children }: any) => {
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
    //contextualSaveBarSource: data?.avatar,
    //url: "http://jadedpixel.com",
    //accessibilityLabel: data?.fullname,
  };

  return (
    <Frame
      logo={logoOptions}
      topBar={<AppTopBar toggleNavigation={setMobileNavigationActive} />}
      navigation={<AppNavigation />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
};
