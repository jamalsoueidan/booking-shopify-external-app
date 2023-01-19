import { useDate } from "@hooks";
import { Validators, useTag, useToast } from "@jamalsoueidan/bsf.bsf-pkg";
import { useStaffScheduleCreate } from "@services/staff/schedule";
import { DatePicker, Layout, Modal } from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getMonth,
  getYear,
  subDays,
} from "date-fns";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";
import { SelectDays } from "./SelectDays";
import { CreateScheduleForm } from "./_createScheduleForm";

interface CreateDayScheduleProps {
  date: string;
  close: (value: null) => void;
}

export default forwardRef(({ date, close }: CreateDayScheduleProps, ref) => {
  const { options } = useTag();
  const params = useParams();
  const { show } = useToast();
  const [{ month, year }, setDate] = useState({
    month: getMonth(new Date(date)) - 1,
    year: getYear(new Date(date)),
  });

  const [selectedDates, setSelectedDates] = useState({
    start: new Date(date),
    end: endOfMonth(new Date(date)),
  });

  const { toUtc } = useDate();

  const { create } = useStaffScheduleCreate();

  const { fields, submit, validate } = useForm({
    fields: {
      days: useField({
        value: [format(new Date(date), "EEEE").toLowerCase()],
        validates: [
          Validators.isSelectedDays("You must select atleast one day"),
        ],
      }),
      startTime: useField({
        value: "09:00",
        validates: [],
      }),
      endTime: useField({
        value: "16:00",
        validates: [],
      }),
      tag: useField({
        value: options[0].value,
        validates: [],
      }),
      available: useField({
        value: true,
        validates: [],
      }),
    },
    onSubmit: async (fieldValues) => {
      const result = eachDayOfInterval(selectedDates);
      const daysToFilterFor = result.filter((r) =>
        fieldValues.days.includes(format(r, "EEEE").toLowerCase())
      );

      const getZonedTime = (date: Date, time: string) =>
        toUtc(`${format(date, "yyyy-MM-dd")} ${time}:00`).toISOString();

      const body = daysToFilterFor.map((date) => {
        return {
          start: getZonedTime(date, fieldValues.startTime),
          end: getZonedTime(date, fieldValues.endTime),
          available: true,
          tag: fieldValues.tag,
        };
      });
      show({ content: "Schedules created" });
      create(body);
      close(null);

      return { status: "success" };
    },
  });

  useImperativeHandle(ref, () => ({
    submit() {
      submit();
      return validate().length == 0;
    },
  }));

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    []
  );

  return (
    <Modal.Section>
      <Layout>
        <Layout.Section>
          <SelectDays days={fields.days}></SelectDays>
        </Layout.Section>
        <Layout.Section>
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            multiMonth
            allowRange
            disableDatesBefore={subDays(new Date(), 1)}
          />
        </Layout.Section>
        <CreateScheduleForm fields={fields} options={options} />
      </Layout>
    </Modal.Section>
  );
});
