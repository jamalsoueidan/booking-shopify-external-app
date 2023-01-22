import { FormLayout, Modal, Text } from "@shopify/polaris";

export const BookingDetailsEdit = ({ info, toggle }: any) => {
  return (
    <Modal.Section>
      <FormLayout>
        <Text variant="bodyMd" as="p" color="critical">
          ATTENTION: When you update this booking it will get deattached from
          shopify order.
        </Text>
      </FormLayout>
    </Modal.Section>
  );
};
