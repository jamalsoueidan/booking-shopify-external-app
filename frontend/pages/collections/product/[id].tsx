import ProductActivate from "@components/collections/product/product-activate";
import ProductBanner from "@components/collections/product/product-banner";
import ProductOptionsCard from "@components/collections/product/product-options-card";
import ProductStaff from "@components/collections/product/product-staff";
import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/pkg.backend-types";
import {
  FormErrors,
  LoadingPage,
  useForm,
  useProductGet,
  useProductUpdate,
  useTranslation,
} from "@jamalsoueidan/pkg.frontend";
import { AlphaStack, Badge, Columns, Form, Page, PageActions } from "@shopify/polaris";
import { useDynamicList, useField } from "@shopify/react-form";
import { useParams } from "react-router-dom";

export default () => {
  const { t } = useTranslation({ id: "product-id", locales });
  const params = useParams();
  const { data: product } = useProductGet({ id: params.id });
  const { update } = useProductUpdate({
    id: params.id,
  });

  const {
    fields,
    submit,
    submitErrors,
    dynamicLists: { staff },
    primaryAction,
  } = useForm({
    dynamicLists: {
      staff: useDynamicList<ProductServiceUpdateBodyStaffProperty>(
        product?.staff || [],
        (staff: ProductServiceUpdateBodyStaffProperty) => staff,
      ),
    },
    fields: {
      active: useField({
        validates: [],
        value: product?.active,
      }),
      buffertime: useField({
        validates: [],
        value: product?.buffertime,
      }),
      duration: useField({
        validates: [],
        value: product?.duration,
      }),
    },
    onSubmit: async (fieldValues) => {
      await update({
        active: fieldValues.active,
        buffertime: fieldValues.buffertime,
        duration: fieldValues.duration,
        staff: fieldValues.staff,
      });
      return { status: "success" };
    },
  });

  if (!product) {
    return <LoadingPage title={t("loading")} />;
  }

  return (
    <Form onSubmit={submit}>
      <Page
        fullWidth
        title={product?.title}
        titleMetadata={
          <Badge status={product.active ? "attention" : "info"}>{product.active ? t("active") : t("deactive")}</Badge>
        }
        breadcrumbs={[{ content: "Collections", url: "/admin/collections" }]}
      >
        <FormErrors errors={submitErrors} />
        {product.staff.length === 0 && <ProductBanner />}
        <Columns columns={["twoThirds", "oneThird"]} gap="4">
          <AlphaStack>
            <ProductStaff product={product} field={staff} />
          </AlphaStack>
          <AlphaStack gap="4">
            <ProductActivate active={fields.active} staffLength={product.staff.length} />
            <ProductOptionsCard fields={fields} />
          </AlphaStack>
        </Columns>
        <br />
        <PageActions primaryAction={primaryAction} />
      </Page>
    </Form>
  );
};

const locales = {
  da: {
    active: "Aktiv",
    deactive: "Deaktiv",
    loading: "Henter produkt detailer",
  },
  en: {
    active: "Active",
    deactive: "Deactive",
    loading: "Loading product details",
  },
};
