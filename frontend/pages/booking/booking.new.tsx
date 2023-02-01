import { CustomerInputAutoComplete } from "@components/booking/booking-form/CustomerInputAutoComplete";
import { ProductSelect } from "@components/booking/booking-form/ProductSelect";
import {
  InputDateDrop,
  InputStaff,
  InputStaffField,
  InputTimerDivider,
  InputTimerDividerFieldType,
  Validators,
  useForm,
  useToast,
  useTranslation,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { useBookingCreate } from "@services/booking";
import { useWidgetDate, useWidgetStaff } from "@services/widget";
import { Card, Form, FormLayout, Layout, Page, PageActions, Range } from "@shopify/polaris";
import { notEmpty, useField } from "@shopify/react-form";
import { endOfMonth, isSameDay } from "date-fns";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { create } = useBookingCreate();
  const { show } = useToast();
  const { t } = useTranslation({ id: "booking-new", locales });
  const [{ start, end }, dateChange] = useState<Range>({
    start: new Date(),
    end: endOfMonth(new Date()),
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
      staff: useField<InputStaffField>({
        value: undefined,
        validates: [notEmpty(t("staff.error_select"))],
      }),
      date: useField<Date>({
        value: undefined,
        validates: [notEmpty(t("date.error_select"))],
      }),
      time: useField<InputTimerDividerFieldType>({
        value: undefined,
        validates: [Validators.notEmptyObject(t("time.error_select"))],
      }),
    },
    onSubmit: async (fieldValues) => {
      await create({
        productId: fieldValues.productId,
        customerId: fieldValues.customer.customerId,
        staff: fieldValues.staff.staff,
        start: fieldValues.time.start as string,
        end: fieldValues.time.end as string,
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
    staff: fields.staff.value?.staff,
    start: start.toJSON(),
    end: end.toJSON(),
  });

  const selectedDate = useMemo(() => {
    if (!fields.date.value) {
      return;
    }

    return schedules?.find((s) => isSameDay(new Date(s.date), new Date(fields.date.value)));
  }, [schedules, fields.date.value]);

  return (
    <Form onSubmit={submit}>
      <Page
        fullWidth
        title={t("title")}
        breadcrumbs={[{ content: "Bookings", onAction: () => navigate("/admin/bookings") }]}
      >
        <Layout>
          <Layout.AnnotatedSection title={t("product.title")} description={t("product.desc")}>
            <Card sectioned>
              <FormLayout>
                <ProductSelect {...fields.productId} />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection title={t("customer.title")} description={t("customer.desc")}>
            <Card sectioned>
              <CustomerInputAutoComplete field={fields.customer} />
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection title={t("staff.title")} description={t("staff.desc")}>
            <Card sectioned>
              <FormLayout>
                <InputStaff field={fields.staff} data={staffOptions} input={{ disabled: !staffOptions }} />
                <InputDateDrop
                  field={fields.date}
                  data={schedules}
                  input={{ disabled: !schedules }}
                  onMonthChange={dateChange}
                />
                <InputTimerDivider field={fields.time} data={selectedDate?.hours} />
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
      title: "1. Vælg et product",
      desc: "Efter  du har valgt et produkt, har du mulighed for at vælg medarbejder.",
      error_empty: "Der er ikke valgt produkt",
    },
    customer: {
      title: "2. Vælg en kunde",
      desc: "Hvem er behandlingen til?",
      error_select: "Du mangler vælg kunde",
    },
    staff: {
      title: "3. Vælg medarbejder, dato og tid.",
      desc: "Når du har valgt medarbejder kan du vælge dato og efterfølgende tid.",
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
      title: "1. Choose a Product",
      desc: "Choose a product so staff, date and time gets enabled.",
      error_empty: "You didn't pick a product",
    },
    customer: {
      title: "2. Choose a Customer",
      desc: "Assign customer to booking.",
      error_select: "You didn't pick a customer",
    },
    staff: {
      title: "3. Choose staff, then date and afterwards time.",
      desc: "When you select staff the date will be enabled and then pick date to get time",
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
