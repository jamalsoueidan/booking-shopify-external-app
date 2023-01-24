import {
  CustomerAutocomplete,
  ProductSelect,
} from "@components/booking/booking-form";
import {
  InputDate,
  InputStaff,
  InputTimer,
  InputTimerFieldType,
  Validators,
  useForm,
  useToast,
  useTranslation,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { useBookingCreate } from "@services/booking";
import { useWidgetDate, useWidgetStaff } from "@services/widget";
import {
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
  Range,
} from "@shopify/polaris";
import { notEmpty, useField } from "@shopify/react-form";
import { isSameDay } from "date-fns";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { create } = useBookingCreate();
  const { show } = useToast();
  const { t } = useTranslation({ id: "booking-new", locales });
  const [{ start, end }, dateChange] = useState<Range>({
    start: new Date(),
    end: new Date(),
  });

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
      time: useField<InputTimerFieldType>({
        value: undefined,
        validates: [Validators.notEmptyObject(t("time.error_select"))],
      }),
    },
    onSubmit: async (fieldValues) => {
      await create({
        productId: fieldValues.productId,
        customerId: fieldValues.customer.customerId,
        staff: fieldValues.staff,
        start: fieldValues.time.start as any,
        end: fieldValues.time.end as any,
      });
      show({ content: t("submit.sucess") });
      navigate(`/admin/bookings`);
      return { status: "success" };
    },
  });

  const { data: staffOptions } = useWidgetStaff({
    productId: fields.productId.value,
  });

  const { data: schedules } = useWidgetDate({
    productId: fields.productId.value,
    staff: fields.staff.value,
    start: start.toJSON(),
    end: end.toJSON(),
  });

  const selectedDate = useMemo(() => {
    if (!fields.date.value) {
      return;
    }

    return schedules?.find((s) =>
      isSameDay(new Date(s.date), new Date(fields.date.value))
    );
  }, [schedules, fields.date.value]);

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
                <InputStaff {...fields.staff} data={staffOptions} />
                <InputDate
                  label="Vælge dato"
                  {...fields.date}
                  data={schedules}
                  mode="inline"
                  onMonthChange={dateChange}
                />
                <InputTimer {...fields.time} data={selectedDate?.hours} />
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
