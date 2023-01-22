import {
  CustomerAutocomplete,
  ProductSelect,
  ScheduleDateSelect,
  ScheduleStaffSelect,
  ScheduleTimerSelect,
} from "@components/booking/booking-form";
import {
  useForm,
  useToast,
  Validators,
  useTranslation,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { useBookingCreate } from "@services/booking";
import {
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
} from "@shopify/polaris";
import { notEmpty, useField } from "@shopify/react-form";
import { useNavigate } from "react-router-dom";

const locales = {
  da: {
    title: "Opret en ny behandlingstid",
    product: {
      title: "Produkt",
      error_empty: "Der er ikke valgt produkt",
    },
    customer: {
      title: "Kunde",
      error_select: "Du mangler vælg kunde",
    },
    staff: {
      title: "Tidsbestilling",
      desc: "Vælg medarbejder, dato og tid",
      error_select: "Du mangler vælg medarbejder",
    },
    date: {
      error_select: "Du mangler vælg dato",
    },
    time: {
      error_select: "Du mangler vælg tid",
    },
    submit: {
      sucess: "Behandlingstid oprettet",
    },
  },
  en: {
    title: "Bookings",
    product: {
      title: "Product",
      error_empty: "You didn't pick a product",
    },
    customer: {
      title: "Customer",
      error_select: "You didn't pick a customer",
    },
    staff: {
      title: "Tidsbestilling",
      desc: "Vælg medarbejder, dato og tid",
      error_select: "You didn't pick a staff",
    },
    date: {
      error_select: "You didn't pick a date",
    },
    time: {
      error_select: "You didn't pick time",
    },
    submit: {
      sucess: "Booking created",
    },
  },
};

export default () => {
  const navigate = useNavigate();
  const { create } = useBookingCreate();
  const { show } = useToast();
  const { t } = useTranslation({ id: "booking-new", locales });
  //https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
  const { fields, submit, primaryAction } = useForm({
    fields: {
      productId: useField<number>({
        value: undefined,
        validates: [notEmpty(t("product.error_empty"))],
      }),
      customer: useField<{ customerId: number; fullName: string }>({
        value: {
          customerId: undefined,
          fullName: undefined,
        },
        validates: [Validators.notEmptyObject(t("customer.error_select"))],
      }),
      staff: useField<string>({
        value: undefined,
        validates: [notEmpty(t("staff.error_select"))],
      }),
      date: useField<Date>({
        value: undefined,
        validates: [notEmpty(t("date.error_select"))],
      }),
      time: useField<{ start: string; end: string }>({
        value: {
          start: undefined,
          end: undefined,
        },
        validates: [Validators.notEmptyObject(t("time.error_select"))],
      }),
    },
    onSubmit: async (fieldValues) => {
      await create({
        productId: fieldValues.productId,
        customerId: fieldValues.customer.customerId,
        staff: fieldValues.staff,
        start: fieldValues.time.start,
        end: fieldValues.time.end,
      });
      show({ content: t("submit.sucess") });
      navigate(`/admin/bookings`);
      return { status: "success" };
    },
  });

  return (
    <Form onSubmit={submit}>
      <Page
        fullWidth
        title={t("title")}
        breadcrumbs={[
          { content: "Bookings", onAction: () => navigate("/admin/bookings") },
        ]}
      >
        <Layout>
          <Layout.AnnotatedSection title={t("product.title")}>
            <Card sectioned>
              <FormLayout>
                <ProductSelect {...fields.productId} />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection title={t("customer.title")}>
            <Card sectioned>
              <CustomerAutocomplete {...fields.customer}></CustomerAutocomplete>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title={t("staff.title")}
            description={t("staff.desc")}
          >
            <Card sectioned>
              <FormLayout>
                <ScheduleStaffSelect
                  field={fields.staff}
                  productId={fields.productId.value}
                />
                <ScheduleDateSelect
                  field={fields.date}
                  staff={fields.staff.value}
                  productId={fields.productId.value}
                />
                <ScheduleTimerSelect
                  field={fields.time}
                  staff={fields.staff.value}
                  date={fields.date.value}
                  productId={fields.productId.value}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        <br />
        <PageActions primaryAction={primaryAction} />
      </Page>
    </Form>
  );
};
