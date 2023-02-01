import { Frame } from "@shopify/polaris";
import { ReactNode, useCallback, useState } from "react";
import logo from "../../assets/logo.avif";
import { AppNavigation } from "./ApplicationNavigation";
import { AppTopBar } from "./ApplicationTopBar";

export default ({ children }: { children: ReactNode }) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((mobileNavigationActive) => !mobileNavigationActive),
    [],
  );

  const logoOptions = {
    topBarSource: logo,
    width: 124,
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
