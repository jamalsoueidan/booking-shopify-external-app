import { Staff } from "@jamalsoueidan/bsb.mongodb.types";
import { Avatar, Card, ResourceList, Text } from "@shopify/polaris";
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
    <Card title="Medarbejder">
      <ResourceList
        resourceName={resourceName}
        showHeader
        items={data}
        renderItem={(item: Staff) => {
          const { _id, fullname, avatar, phone } = item;
          const media = <Avatar customer size="medium" name={fullname} source={avatar} />;

          return (
            <ResourceList.Item id={_id} url="asd" media={media}>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {fullname}
              </Text>
              <div>Phone: +{phone}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  );
});
