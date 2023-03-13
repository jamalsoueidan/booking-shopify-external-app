import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/pkg.backend-types";
import {
  AbilityCan,
  HelperArray,
  ProductStaffEmpty,
  StaffResourceList,
  usePosition,
  useTag,
  useTranslation,
} from "@jamalsoueidan/pkg.frontend";
import { AlphaCard, Avatar, Box, Button, Columns, Inline, Text } from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";
import { useCallback, useContext, useMemo } from "react";
import FormContext from "./form-context";

interface StaffListProps {
  action: () => void;
}

export const StaffList = ({ action }: StaffListProps) => {
  const { selectTagLabel } = useTag();
  const { selectPosition } = usePosition();
  const { field } = useContext(FormContext);

  const renderItem = useCallback(
    ({ fullname, avatar, position, tag }: ProductServiceUpdateBodyStaffProperty) => ({
      desc: selectTagLabel(tag),
      media: <Avatar customer size="medium" name={fullname} source={avatar} />,
      title: `${fullname}, ${selectPosition(position)}`,
    }),
    [selectPosition, selectTagLabel],
  );

  const items = useMemo(() => [...field.value].sort(HelperArray.sortByText((d) => d.fullname)), [field]);

  return (
    <AlphaCard padding="0">
      <StaffListHeader itemsLength={items.length} action={action} />
      <StaffResourceList emptyState={<ProductStaffEmpty action={action} />} items={items} renderItem={renderItem} />
    </AlphaCard>
  );
};

type StaffListHeader = {
  itemsLength: number;
  action: () => void;
};

const StaffListHeader = ({ itemsLength, action }: StaffListHeader) => {
  const { t, tdynamic } = useTranslation({
    id: "product-staff-list",
    locales: {
      da: {
        browse: "Redigere medarbejder",
        staff: {
          other: "{count} medarbejder tilføjet",
          zero: "Tillføje medarbejder til dette produkt",
        },
        title: "Medarbejder",
      },
      en: {
        browse: "Edit staff",
        staff: {
          other: "{count} staff added",
          zero: "Add staff to this product",
        },
        title: "Staff",
      },
    },
  });

  const { product } = useContext(FormContext);

  return (
    <>
      <Box padding="4">
        <Text as="h1" variant="bodyLg" fontWeight="bold">
          {t("title")}
        </Text>
      </Box>
      <Box paddingInlineStart="4" paddingInlineEnd="4" paddingBlockEnd="4">
        <Columns columns={2}>
          <Inline blockAlign="center">
            <Text as="h2" variant="bodyLg">
              {tdynamic("staff", {
                count: itemsLength || 0,
              })}
            </Text>
          </Inline>
          <Inline align="end" blockAlign="center">
            <AbilityCan I="update" a="product" this={product}>
              <Button size="slim" onClick={action} outline icon={PlusMinor}>
                {t("browse")}
              </Button>
            </AbilityCan>
          </Inline>
        </Columns>
      </Box>
    </>
  );
};
