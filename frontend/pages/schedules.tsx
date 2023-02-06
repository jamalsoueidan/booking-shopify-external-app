import Metadata from "@components/staff/Metadata";
import { Schedule } from "@jamalsoueidan/bsb.types";
import { LoadingModal, LoadingPage, LoadingSpinner, ScheduleCalendarDateState } from "@jamalsoueidan/bsf.bsf-pkg";
import { useStaff } from "@services/staff";
import { useStaffSchedule } from "@services/staff/schedule";
import { Card, Page } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useState } from "react";

const ScheduleCalendar = lazy(() =>
  import("@jamalsoueidan/bsf.bsf-pkg").then((module) => ({
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
  const [rangeDate, setRangeDate] = useState<ScheduleCalendarDateState>();
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
    return <LoadingPage title={!staff ? "Loading staff data..." : "Loading schedules data..."} />;
  }

  const { fullname, active } = staff;

  return (
    <Page fullWidth title={fullname} titleMetadata={<Metadata active={active} />}>
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

        <Card sectioned>
          <Suspense fallback={<LoadingSpinner />}>
            <ScheduleCalendar
              onChangeDate={setRangeDate}
              data={calendar}
              onClick={setDate}
              onClickSchedule={setSchedule}
            />
          </Suspense>
        </Card>
      </Card>
    </Page>
  );
};
