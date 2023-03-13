import { LoadingPage, useCollection, useCollectionCreate, useTranslation } from "@jamalsoueidan/pkg.frontend";
import { AlphaCard, EmptyState, Page } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { isFetching, isFetched } = useCollectionCreate();
  const { t } = useTranslation({ id: "collection-empty", locales });
  const { data } = useCollection();

  if (isFetching) {
    return <LoadingPage title="Updating collections..." />;
  }

  if (data?.length > 0 || isFetched) {
    navigate("/collections");
    return <></>;
  }

  return (
    <Page fullWidth title={t("title")}>
      <AlphaCard>
        <EmptyState
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          heading={t("title")}
        >
          <p>{t("text")} 🚀</p>
        </EmptyState>
      </AlphaCard>
    </Page>
  );
};

const locales = {
  da: {
    choose_collections: "Ingen kollektion(er)",
    text: "Der er ikke tilføjet kollektioner endnu",
    title: "Begynd at tag imod reservationer i din butik.",
  },
  en: {
    choose_collections: "Choose collection(s)",
    text: "There is none collection(s) in store yet!",
    title: "Start collecting appointments on your store.",
  },
};
