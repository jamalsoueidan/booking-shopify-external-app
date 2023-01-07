import { Frame } from "@shopify/polaris";
import { AppNavigation } from "components/AppNavigation";
import { AppTopBar } from "components/AppTopBar";
import { useCallback, useState } from "react";
import logo from "../logo.svg";

export default () => {
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
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
    url: "http://jadedpixel.com",
    accessibilityLabel: "Jaded Pixel",
  };

  return (
    <Frame
      logo={logoOptions}
      topBar={<AppTopBar toggleNavigation={setMobileNavigationActive} />}
      navigation={<AppNavigation />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      ijosd
    </Frame>
  );
};
