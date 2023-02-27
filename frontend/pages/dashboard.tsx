import { DashboardGroup } from "@components/dashboard/Group";
import { LoadingSpinner, useStaff } from "@jamalsoueidan/pkg.bsf";
import { Card, Grid, Page } from "@shopify/polaris";
import { Suspense } from "react";

export default () => {
  const { data } = useStaff();

  return (
    <Page title="Dashboard">
      <Grid>
        <Grid.Cell columnSpan={{ lg: 6, md: 3, sm: 6, xl: 6, xs: 6 }}>
          <Card title="Dashboard" sectioned>
            <p>Welcome to dashboard</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ lg: 6, md: 3, sm: 6, xl: 6, xs: 6 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardGroup data={data} />
          </Suspense>
        </Grid.Cell>
      </Grid>
    </Page>
  );
};
