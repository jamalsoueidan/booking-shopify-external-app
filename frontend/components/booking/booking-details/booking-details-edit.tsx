import { Form, FormLayout, Modal, Range, Text } from "@shopify/polaris";
import { notEmpty, useField } from "@shopify/react-form";

import { WidgetHourRange } from "@jamalsoueidan/bsb.mongodb.types";
import {
  FormErrors,
  InputDate,
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
import { isSameDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const locales = {
  da: {
    toast: "a",
  },
  en: {},
};

export const BookingDetailsEdit = ({
  booking,
}: {
  booking: GetBookingsResponse;
}) => {
  const { data: staffOptions } = useWidgetStaff({
    productId: booking.productId,
  });

  const [{ start, end }, dateChange] = useState<Range>({
    start: new Date(),
    end: new Date(),
  });

  const navigate = useNavigate();
  const { update } = useBookingUpdate({ id: booking._id });
  const { t } = useTranslation({ id: "bookings-edit", locales });
  const { show } = useToast();
  const { setPrimaryAction, setSecondaryActions } = useModal();

  useEffect(() => {
    setPrimaryAction({
      content: "Ændre dato/tid",
      onAction: submit,
    });
    setSecondaryActions([
      {
        content: "Annullere",
        onAction: () => {
          navigate("../");
        },
      },
    ]);

    return () => {
      setSecondaryActions(null);
      setPrimaryAction(null);
    };
  }, [setPrimaryAction, setPrimaryAction]);

  const { fields, submit, submitErrors, isSubmitted, isValid } = useForm({
    fields: {
      staff: useField<string>({
        value: booking.staff._id || "",
        validates: [notEmpty("staff is required")],
      }),
      date: useField<Date>({
        value: new Date(booking.start) || undefined,
        validates: [notEmpty("date is required")],
      }),
      time: useField<InputTimerFieldType>({
        value: {
          start: booking.start,
          end: booking.end,
        },
        validates: [notEmpty("time is required")],
      }),
    },
    onSubmit: async (fieldValues: any) => {
      update({
        start: fieldValues.time.start,
        end: fieldValues.time.end,
        staff: fieldValues.staff,
      });
      //toggle();
      show({ content: t("toast") });
      return { status: "success" };
    },
    enableSaveBar: false,
  });

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

    const schedule = schedules?.find((s) =>
      isSameDay(new Date(s.date), fields.date.value)
    );

    if (!schedule) {
      return [bookingDefault];
    }

    return [bookingDefault, ...schedule.hours];
  }, [schedules, fields.date.value]);

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
          Der er ingen medarbejder længere tilknyttet til dette produkt, gå til
          produkt og tilføj medarbejder.
        </Text>
      </Modal.Section>
    );
  }

  return (
    <Form onSubmit={submit}>
      <Modal.Section>
        <FormLayout>
          {isSubmitted && !isValid && <FormErrors errors={submitErrors} />}
          <InputStaff {...fields.staff} data={staffOptions} />
          <InputDate
            {...fields.date}
            label="Vælge dato"
            data={schedules}
            mode="inline"
            onMonthChange={dateChange}
          />
          <InputTimer {...fields.time} data={hours} mode="inline" />
          <Text variant="bodyMd" as="p" color="critical">
            ATTENTION: When you update this booking it will get deattached from
            shopify order.
          </Text>
        </FormLayout>
      </Modal.Section>
    </Form>
  );
};
