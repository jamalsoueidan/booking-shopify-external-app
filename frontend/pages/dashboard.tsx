import { DashboardGroup } from "@components/dashboard/Group";
import { LoadingSpinner, useStaff } from "@jamalsoueidan/pkg.frontend";
import { AlphaCard, Columns, Page, Text } from "@shopify/polaris";
import { Suspense } from "react";

export default () => {
  const { data } = useStaff();

  return (
    <Page title="Dashboard">
      <Columns columns={2} alignItems="start" gap="4">
        <AlphaCard>
          <Text variant="bodyMd" fontWeight="bold" as="h2">
            Dashboard
          </Text>
          <p>Welcome to dashboard</p>
        </AlphaCard>

        <Suspense fallback={<LoadingSpinner />}>
          <DashboardGroup data={data || []} />
        </Suspense>
      </Columns>
    </Page>
  );
};
