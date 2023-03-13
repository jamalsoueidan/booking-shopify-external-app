import ModalConfirm from "@components/modals/ModalConfirm";
import { CollectionServiceGetAllReturn } from "@jamalsoueidan/pkg.backend-types";
import { ProductResourceList, useAbility, useCollectionDestroy, useTranslation } from "@jamalsoueidan/pkg.frontend";
import { AlphaCard, Box, Button, Columns, Inline, Text } from "@shopify/polaris";
import { memo, useCallback, useState } from "react";

interface CollectionProps {
  collection: CollectionServiceGetAllReturn;
}

export default memo(({ collection }: CollectionProps) => {
  const [modalConfirm, setModalConfirm] = useState<JSX.Element>();
  const ability = useAbility();
  const { destroy } = useCollectionDestroy({ collectionId: collection._id });
  const { t } = useTranslation({ id: "collection-item", locales });

  const setActive = useCallback(
    async (shouldDestroy: boolean) => {
      shouldDestroy && destroy();
      setModalConfirm(null);
    },
    [destroy],
  );

  const removeCollection = useCallback(() => {
    setModalConfirm(<ModalConfirm active={true} setActive={setActive} />);
  }, [setActive]);

  return (
    <>
      {modalConfirm}
      <AlphaCard padding="0">
        <Box paddingBlockStart="4" paddingInlineStart="4" paddingInlineEnd="4">
          <Columns columns={2}>
            <Inline blockAlign="center">
              <Text as="h2" variant="bodyMd">
                {collection.title}
              </Text>
            </Inline>
            <Inline align="end">
              {ability.can("delete", "collection") && (
                <Button onClick={removeCollection} plain>
                  {t("remove_collection")}
                </Button>
              )}
            </Inline>
          </Columns>
        </Box>
        <ProductResourceList items={collection.products} />
      </AlphaCard>
    </>
  );
});

const locales = {
  da: {
    remove_collection: "Fjern",
  },
  en: {
    remove_collection: "Remove",
  },
};
