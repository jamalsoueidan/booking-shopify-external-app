import { DashboardGroup } from "@components/dashboard/Group";
import { useBookingGetStaff } from "@services/booking";
import { Card, Frame, Grid, Page } from "@shopify/polaris";
import { AppNavigation } from "components/AppNavigation";
import { AppTopBar } from "components/AppTopBar";
import { useCallback, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default () => {
  const { data } = useBookingGetStaff();
  const { pathname } = useLocation();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const logoOptions = {
    //width: 124,
    //topBarSource: logo,
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
      {pathname === "/dashboard" ? (
        <Page title="Dashboard">
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
              <Card title="Dashboard" sectioned>
                <p>Welcome to dashboard</p>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
              <DashboardGroup data={data}></DashboardGroup>
            </Grid.Cell>
          </Grid>
        </Page>
      ) : (
        <Outlet />
      )}
    </Frame>
  );
};
