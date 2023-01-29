import { Columns, Form, FormLayout, Modal, Range, Text } from "@shopify/polaris";
import { notEmpty, useField } from "@shopify/react-form";

import { WidgetHourRange } from "@jamalsoueidan/bsb.mongodb.types";

import {
  FormErrors,
  InputDateFlat,
  InputStaff,
  InputTimer,
  InputTimerFieldType,
  LoadingSpinner,
  useForm,
  useToast,
  useTranslation,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { useModal } from "@providers/modal";
import { useBookingUpdate } from "@services/booking";
import { useWidgetDate, useWidgetStaff } from "@services/widget";
import { endOfMonth, isSameDay, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BookingDetailsEdit = ({ booking }: { booking: GetBookingsResponse }) => {
  const { data: staffOptions } = useWidgetStaff({
    productId: booking.productId,
  });

  const [{ start, end }, dateChange] = useState<Range>({
    start: startOfMonth(new Date(booking.start)),
    end: endOfMonth(new Date(booking.end)),
  });

  const navigate = useNavigate();
  const { update } = useBookingUpdate({ id: booking._id });
  const { t } = useTranslation({ id: "bookings-edit", locales });
  const { show } = useToast();
  const { setPrimaryAction, setSecondaryActions } = useModal();

  const { fields, submit, submitErrors, isSubmitted, isValid } = useForm({
    fields: {
      staff: useField<string>({
        value: booking.staff._id || "",
        validates: [notEmpty(t("staff.error_select"))],
      }),
      date: useField<Date>({
        value: new Date(booking.start) || undefined,
        validates: [notEmpty(t("date.error_select"))],
      }),
      time: useField<InputTimerFieldType>({
        value: {
          start: booking.start,
          end: booking.end,
        },
        validates: [notEmpty(t("time.error_select"))],
      }),
    },
    onSubmit: async (fieldValues: any) => {
      update({
        start: fieldValues.time.start,
        end: fieldValues.time.end,
        staff: fieldValues.staff,
      });
      navigate("../");
      show({ content: t("submit.sucess") });
      return { status: "success" };
    },
    enableSaveBar: false,
  });

  useEffect(() => {
    setPrimaryAction({
      content: t("submit.primary_button"),
      onAction: submit,
    });
    setSecondaryActions([
      {
        content: t("submit.secondary_button"),
        onAction: () => {
          navigate("../");
        },
      },
    ]);

    return () => {
      setSecondaryActions(null);
      setPrimaryAction(null);
    };
  }, [setPrimaryAction, setSecondaryActions, navigate, t, submit]);

  const { data: schedules } = useWidgetDate({
    productId: booking.productId,
    staff: fields.staff.value,
    start: start.toJSON(),
    end: end.toJSON(),
  });

  const hours: WidgetHourRange[] = useMemo(() => {
    const bookingDefault = {
      start: booking.start,
      end: booking.end,
    };

    const schedule = schedules?.find((s) => isSameDay(new Date(s.date), fields.date.value));

    if (!schedule) {
      return [];
    }

    return [bookingDefault, ...schedule.hours];
  }, [schedules, fields.date.value, booking.end, booking.start]);

  if (!staffOptions) {
    return (
      <Modal.Section>
        <LoadingSpinner />
      </Modal.Section>
    );
  }

  if (staffOptions.length === 0) {
    return (
      <Modal.Section>
        <Text variant="bodyMd" as="p">
          {t("staff.error_empty")}
        </Text>
      </Modal.Section>
    );
  }

  return (
    <Form onSubmit={submit}>
      <Modal.Section>
        <FormLayout>
          {isSubmitted && !isValid && <FormErrors errors={submitErrors} />}
          <InputStaff field={fields.staff} data={staffOptions} />
          <Columns columns={{ xs: 2 }}>
            <InputDateFlat field={fields.date} data={schedules} onMonthChange={dateChange} />
            <InputTimer {...fields.time} data={hours} mode="list" />
          </Columns>
          {!booking.isSelfBooked ? (
            <Text variant="bodyMd" as="p" color="critical">
              {t("shopify")}
            </Text>
          ) : null}
        </FormLayout>
      </Modal.Section>
    </Form>
  );
};

const locales = {
  da: {
    title: "Opret en ",
    staff: {
      error_empty:
        "Der er ingen medarbejder længere tilknyttet til dette produkt, gå til produkt og tilføj medarbejder.",
      error_select: "Du mangler vælg medarbejder",
    },
    date: {
      error_select: "Du mangler vælg dato",
    },
    time: {
      error_select: "Du mangler vælg tid",
    },
    submit: {
      primary_button: "Ændre dato/tid",
      secondary_button: "Anulllere",
      sucess: "Behandlingstid opdateret",
    },
    shopify: "ATTENTION: Når du opdatere dette behandlingstid, så bliver den afkoblet fra shopify!",
  },
  en: {
    title: "Bookings",
    staff: {
      error_empty: "No staff belong to this product yet!",
      error_select: "You didn't pick a staff",
    },
    date: {
      error_select: "You didn't pick a date",
    },
    time: {
      error_select: "You didn't pick time",
    },
    submit: {
      primary_button: "Change time",
      secondary_button: "Cancel",
      sucess: "Booking updated",
    },
    shopify: "ATTENTION: When you update this booking it will get deattached from shopify order.",
  },
};
