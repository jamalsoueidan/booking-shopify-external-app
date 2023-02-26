import MetaData from "@components/staff/meta-data";
import { Staff } from "@jamalsoueidan/pkg.bsb-types";
import { usePosition, useStaff, useTranslation } from "@jamalsoueidan/pkg.bsf";
import { Avatar, Card, Page, ResourceItem, ResourceList, Text } from "@shopify/polaris";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const { t } = useTranslation({ id: "staff", locales });
  const navigate = useNavigate();
  const { data } = useStaff();
  const { selectPosition } = usePosition();

  const renderItems = useCallback(
    (item: Staff) => {
      const { _id, fullname, active, avatar, position } = item;
      const media = <Avatar customer size="medium" name={fullname} source={avatar} />;

      return (
        <ResourceItem
          id={_id}
          onClick={() => navigate("/admin/staff/" + _id)}
          media={media}
          accessibilityLabel={`View details for ${fullname}`}
        >
          <Text variant="headingSm" as="h6">
            {fullname} <MetaData active={active} />
          </Text>
          <div>
            {selectPosition(position)}
            <br />
          </div>
        </ResourceItem>
      );
    },
    [navigate, selectPosition],
  );

  return (
    <Page
      fullWidth
      title={t("title")}
      primaryAction={{
        content: t("add"),
        url: "/admin/staff/new",
      }}
    >
      <Card>
        <ResourceList
          resourceName={{
            plural: t("resource.plural"),
            singular: t("resource.singular"),
          }}
          items={data || []}
          renderItem={renderItems}
        />
      </Card>
    </Page>
  );
};

const locales = {
  da: {
    title: "Medarbejder ",
    add: "Tilføj ny medarbejder",
    resource: {
      plural: "medarbejder",
      singular: "medarbejder",
    },
  },
  en: {
    title: "Staff",
    add: "Add staff member",
    resource: {
      plural: "customers",
      singular: "customer",
    },
  },
};
