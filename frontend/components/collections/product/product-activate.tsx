import { Product } from "@jamalsoueidan/pkg.backend-types";
import { AlphaCard, Box, Select, Text } from "@shopify/polaris";
import { FieldDictionary } from "@shopify/react-form";
import { memo, useCallback, useMemo } from "react";

interface FormFields extends FieldDictionary<Pick<Product, "active">> {
  staffLength: number;
}

export default memo(({ active, staffLength }: FormFields) => {
  const onChange = useCallback(
    (value: string) => {
      active.onChange(value === "true" ? true : false);
    },
    [active],
  );

  const options = useMemo(
    () => [
      {
        label: "Activate",
        value: "true",
      },
      {
        label: "Deactivate",
        value: "false",
      },
    ],
    [],
  );

  return (
    <AlphaCard>
      <Box paddingBlockEnd="4">
        <Text variant="bodyMd" as="h1" fontWeight="semibold">
          Product status
        </Text>
      </Box>
      <Select
        label=""
        options={options}
        onChange={onChange}
        value={active.value ? "true" : "false"}
        disabled={staffLength === 0}
        onBlur={active.onBlur}
      />
    </AlphaCard>
  );
});
