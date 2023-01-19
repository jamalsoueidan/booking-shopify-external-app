import ApplicationFrame from "@components/application/ApplicationFrame";
import { DashboardGroup } from "@components/dashboard/Group";
import { SaveBarProvider, ToastProvider } from "@jamalsoueidan/bsf.bsf-pkg";
import { useGroup } from "@services/group";
import { useUserSetting } from "@services/user";
import { Card, Grid, Page } from "@shopify/polaris";
import { Outlet, useLocation } from "react-router-dom";
export default () => {
  const { data: group } = useGroup();
  const { pathname } = useLocation();

  // force fetching userSetting so application change language! until another solution
  const { data: userSettings } = useUserSetting();

  return (
    <ApplicationFrame>
      <SaveBarProvider>
        <ToastProvider>
          {pathname === "/dashboard" ? (
            <Page title="Dashboard">
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <Card title="Dashboard" sectioned>
                    <p>Welcome to dashboard</p>
                    <p>
                      Language: <strong>{userSettings?.language}</strong>
                    </p>
                    <p>
                      TimeZone: <strong>{userSettings?.timeZone}</strong>
                    </p>
                  </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <DashboardGroup data={group}></DashboardGroup>
                </Grid.Cell>
              </Grid>
            </Page>
          ) : (
            <Outlet />
          )}
        </ToastProvider>
      </SaveBarProvider>
    </ApplicationFrame>
  );
};
