import { DashboardGroup } from "@components/dashboard/Group";
import { LoadingSpinner } from "@jamalsoueidan/bsf.bsf-pkg";
import { useGroup } from "@services/group";
import { Card, Grid, Page } from "@shopify/polaris";
import { Suspense } from "react";

export default () => {
  const { data: group } = useGroup();
  return (
    <Page title="Dashboard">
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
          <Card title="Dashboard" sectioned>
            <p>Welcome to dashboard</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardGroup data={group}></DashboardGroup>
          </Suspense>
        </Grid.Cell>
      </Grid>
    </Page>
  );
};
