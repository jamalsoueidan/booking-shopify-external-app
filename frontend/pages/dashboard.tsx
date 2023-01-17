import { DashboardGroup } from "@components/dashboard/Group";
import { useGroup } from "@services/group";
import { Card, Grid, Page } from "@shopify/polaris";
import { I18nContext } from "@shopify/react-i18n";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
export default () => {
  const { data } = useGroup();
  const { pathname } = useLocation();

  console.log(I18nContext, useContext(I18nContext));

  return pathname === "/dashboard" ? (
    <Page title="Dashboard">
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
          <Card title="Dashboard" sectioned>
            Hej med dig
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
          <DashboardGroup data={data}></DashboardGroup>
        </Grid.Cell>
      </Grid>
    </Page>
  ) : (
    <Outlet />
  );
};
