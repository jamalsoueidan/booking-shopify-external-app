import ModalConfirm from "@components/modals/ModalConfirm";
import { CollectionServiceGetAllReturn } from "@jamalsoueidan/pkg.backend-types";
import { ProductResourceList, useAbility, useCollectionDestroy, useTranslation } from "@jamalsoueidan/pkg.frontend";
import { Card } from "@shopify/polaris";
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
      <Card
        title={collection.title}
        actions={[
          ability.can("delete", "collection") && { content: t("remove_collection"), onAction: removeCollection },
        ]}
      >
        <ProductResourceList items={collection.products} />
      </Card>
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
