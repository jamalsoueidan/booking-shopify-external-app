import { Schedule } from "@jamalsoueidan/pkg.backend-types";
import {
  CalendarDate,
  LoadingModal,
  LoadingPage,
  LoadingSpinner,
  useStaffSchedule,
  useTranslation,
} from "@jamalsoueidan/pkg.frontend";
import { useAccount } from "@services/account";
import { AlphaCard, Page } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useState } from "react";

const ScheduleCalendar = lazy(() =>
  import("@jamalsoueidan/pkg.frontend").then((module) => ({
    default: module.ScheduleCalendar,
  })),
);

const CreateScheduleModal = lazy(() =>
  import("../../components/staff/modals/create-shift-modal").then((module) => ({
    default: module.CreateShiftModal,
  })),
);

const EditOneScheduleModal = lazy(() =>
  import("../../components/staff/modals/edit-one-shift-modal").then((module) => ({
    default: module.EditOneShiftModal,
  })),
);

const EditManyScheduleModal = lazy(() =>
  import("../../components/staff/modals/edit-many-shifts-modal").then((module) => ({
    default: module.EditManyShiftsModal,
  })),
);

export default () => {
  const { t } = useTranslation({ id: "schedules", locales });
  const [rangeDate, setRangeDate] = useState<CalendarDate>();
  const [date, setDate] = useState<Date>();
  const [editOneSchedule, setEditOneSchedule] = useState<Schedule>();
  const [editManySchedule, setEditManySchedule] = useState<Schedule>();

  const close = useCallback(() => {
    setDate(null);
    setEditManySchedule(null);
    setEditOneSchedule(null);
  }, []);

  const edit = useCallback((schedule: Schedule) => {
    if (schedule.groupId) {
      setEditManySchedule(schedule);
    } else {
      setEditOneSchedule(schedule);
    }
  }, []);

  const { data: staff } = useAccount();

  const { data: calendar } = useStaffSchedule({
    end: rangeDate?.end,
    staff: staff?._id,
    start: rangeDate?.start,
  });

  if (!staff || !calendar) {
    return <LoadingPage title={!staff ? t("loading.staff") : t("loading.data")} />;
  }

  return (
    <Page fullWidth title={t("title")} primaryAction={{ content: t("create"), onAction: () => setDate(new Date()) }}>
      <AlphaCard>
        {date && (
          <Suspense fallback={<LoadingModal />}>
            <CreateScheduleModal selectedDate={date} staff={staff._id} close={close} />
          </Suspense>
        )}
        {editOneSchedule && (
          <Suspense fallback={<LoadingModal />}>
            <EditOneScheduleModal schedule={editOneSchedule} close={close} />
          </Suspense>
        )}
        {editManySchedule && (
          <Suspense fallback={<LoadingModal />}>
            <EditManyScheduleModal schedule={editManySchedule} close={close} />
          </Suspense>
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <ScheduleCalendar
            onChangeDate={setRangeDate}
            data={calendar}
            onClick={setDate}
            onClickSchedule={edit}
            initialView="dayGridMonth"
          />
        </Suspense>
      </AlphaCard>
    </Page>
  );
};

const locales = {
  da: {
    create: "Opret vagtplan",
    loading: {
      data: "Henter din vagtplan",
      staff: "Henter din data",
    },
    title: "Min vagtplan",
  },
  en: {
    create: "Create shift",
    loading: {
      data: "Loading your shifts",
      staff: "Loading your data",
    },
    title: "My Shifts",
  },
};
