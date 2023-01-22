import { useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { Card, EmptyState } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const locales = {
  da: {
    add: "Tilføj medarbejder",
    heading: "Gå igang med at oprette medarbejder!",
    text: "Tilføj nye medarbejder. Efterfølgende kan du tilføje timer, og tilføje medarbejder til behandlinger.",
    title: "Medarbejder",
  },
  en: {
    add: "Add Staff",
    heading: "Team up and do even more!",
    text: "Add new staff. Then you'll be able to manage member profiles, working hours and who's doing what service.",
    title: "Staff",
  },
};

export default () => {
  const navigate = useNavigate();
  const { t } = useTranslation({ id: "staff-empty", locales });

  const props = { onAction: () => navigate("/Staff/New") };

  return (
    <Card sectioned>
      <EmptyState
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading={t("heading")}
        action={{
          content: t("add"),
          ...props,
        }}
      >
        <p>{t("text")}</p>
      </EmptyState>
    </Card>
  );
};
