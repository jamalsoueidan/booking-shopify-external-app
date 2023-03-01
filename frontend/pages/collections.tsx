import CollectionList from "@components/collections/collection-list";
import { LoadingSpinner, useCollection, useTranslation } from "@jamalsoueidan/pkg.frontend";
import { Page } from "@shopify/polaris";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { data } = useCollection();
  const { t } = useTranslation({ id: "collections", locales });

  if (data?.length === 0) {
    navigate("/admin/collections/empty");
    return <></>;
  }

  return (
    <Page fullWidth title={t("title")}>
      <Suspense fallback={<LoadingSpinner />}>
        <CollectionList collections={data} />
      </Suspense>
    </Page>
  );
};

const locales = {
  da: {
    add_collection: "Tilføj kategori",
    title: "Kategorier",
  },
  en: {
    add_collection: "Add Category",
    title: "Categories",
  },
};
