import { Schedule } from "@jamalsoueidan/bsb.types";
import { CalendarDate, LoadingModal, LoadingPage, LoadingSpinner, useTranslation } from "@jamalsoueidan/pkg.bsf";
import { useStaff } from "@services/staff";
import { useStaffSchedule } from "@services/staff/schedule";
import { Card, Page } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useState } from "react";

const ScheduleCalendar = lazy(() =>
  import("@jamalsoueidan/pkg.bsf").then((module) => ({
    default: module.ScheduleCalendar,
  })),
);

const CreateScheduleModal = lazy(() =>
  import("../components/staff/modals/create-shift-modal").then((module) => ({
    default: module.CreateShiftModal,
  })),
);

const EditScheduleModal = lazy(() =>
  import("../components/staff/modals/edit-shift-modal").then((module) => ({
    default: module.EditShiftModal,
  })),
);

export default () => {
  const { t } = useTranslation({ id: "schedules", locales });
  const [rangeDate, setRangeDate] = useState<CalendarDate>();
  const [date, setDate] = useState<Date>();
  const [schedule, setSchedule] = useState<Schedule>();

  const close = useCallback(() => {
    setDate(null);
    setSchedule(null);
  }, []);

  const { data: staff } = useStaff();

  const { data: calendar } = useStaffSchedule({
    end: rangeDate?.end,
    start: rangeDate?.start,
  });

  if (!staff || !calendar) {
    return <LoadingPage title={!staff ? t("loading.staff") : t("loading.data")} />;
  }

  return (
    <Page fullWidth title={t("title")} primaryAction={{ content: t("create"), onAction: () => setDate(new Date()) }}>
      <Card sectioned>
        {date && (
          <Suspense fallback={<LoadingModal />}>
            <CreateScheduleModal selectedDate={date} close={close} />
          </Suspense>
        )}
        {schedule && (
          <Suspense fallback={<LoadingModal />}>
            <EditScheduleModal schedule={schedule} close={close} />
          </Suspense>
        )}

        <Suspense fallback={<LoadingSpinner />}>
          <ScheduleCalendar
            onChangeDate={setRangeDate}
            data={calendar}
            onClick={setDate}
            onClickSchedule={setSchedule}
            initialView="dayGridMonth"
          />
        </Suspense>
      </Card>
    </Page>
  );
};

const locales = {
  da: {
    title: "Min vagtplan",
    create: "Opret vagtplan",
    loading: {
      staff: "Henter din data",
      data: "Henter din vagtplan",
    },
  },
  en: {
    title: "My Shifts",
    create: "Create shift",
    loading: {
      staff: "Loading your data",
      data: "Loading your shifts",
    },
  },
};
