import { Staff } from "@jamalsoueidan/pkg.backend-types";
import { AlphaCard, Avatar, Box, ResourceList, Text } from "@shopify/polaris";
import { memo } from "react";

interface DashboardGroupProps {
  data: Staff[];
}

export const DashboardGroup = memo(({ data }: DashboardGroupProps) => {
  const resourceName = {
    plural: "staff",
    singular: "staff",
  };

  return (
    <AlphaCard padding="0">
      <Box paddingBlockStart="4" paddingInlineEnd="4" paddingInlineStart="4">
        <Text as="h1" variant="bodyMd" fontWeight="semibold">
          Medarbejder
        </Text>
      </Box>
      <ResourceList
        resourceName={resourceName}
        showHeader
        items={data}
        renderItem={(item: Staff) => {
          const { _id, fullname, avatar, phone } = item;
          const media = <Avatar customer size="medium" name={fullname} source={avatar} />;

          return (
            <ResourceList.Item id={_id} url={`/admin/staff/${_id}`} media={media}>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {fullname}
              </Text>
              <div>Phone: +{phone}</div>
            </ResourceList.Item>
          );
        }}
      />
    </AlphaCard>
  );
});
