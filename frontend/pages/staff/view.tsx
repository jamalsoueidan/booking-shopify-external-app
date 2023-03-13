import { subject } from "@casl/ability";
import MetaData from "@components/staff/meta-data";
import { Schedule } from "@jamalsoueidan/pkg.backend-types";
import {
  LoadingModal,
  LoadingPage,
  LoadingSpinner,
  useAbility,
  useStaffGet,
  useStaffSchedule,
  useTranslation,
} from "@jamalsoueidan/pkg.frontend";

import { AlphaCard, Page } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

export default () => {
  const { t } = useTranslation({ id: "staff-schedule", locales });
  const ability = useAbility();
  const params = useParams();
  const [rangeDate, setRangeDate] = useState<{ start: Date; end: Date }>();
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

  const { data: staff } = useStaffGet({ userId: params.id });

  const { data: calendar } = useStaffSchedule({
    end: rangeDate?.end,
    staff: params.id,
    start: rangeDate?.start,
  });

  if (!staff || !calendar) {
    return <LoadingPage title={!staff ? t("loading.staff") : t("loading.data")} />;
  }

  const { _id, fullname, active } = staff;

  const editSchedule = ability.can("update", subject("staff", staff)) && {
    onClick: setDate,
    onClickSchedule: edit,
  };

  return (
    <Page
      fullWidth
      title={t("title", { fullname })}
      titleMetadata={<MetaData active={active} />}
      backAction={{ content: "staff", url: "/admin/staff" }}
      primaryAction={
        ability.can("update", subject("staff", staff)) && {
          content: t("edit", { fullname }),
          url: "/admin/staff/edit/" + _id,
        }
      }
      secondaryActions={
        ability.can("update", subject("staff", staff)) && [
          {
            content: t("add"),
            onAction: () => setDate(new Date()),
          },
        ]
      }
    >
      <>
        {date && (
          <Suspense fallback={<LoadingModal />}>
            <CreateScheduleModal selectedDate={date} staff={params.id} close={close} />
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
        <AlphaCard>
          <Suspense fallback={<LoadingSpinner />}>
            <ScheduleCalendar onChangeDate={setRangeDate} data={calendar} {...editSchedule} />
          </Suspense>
        </AlphaCard>
      </>
    </Page>
  );
};

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

const locales = {
  da: {
    add: "Tilføj vagt",
    edit: "Redigere bruger",
    loading: {
      data: "Henter medarbejder vagtplan",
      staff: "Henter medarbejder data",
    },
    title: "{fullname} vagtplan",
  },
  en: {
    add: "Add shift",
    edit: "Edit staff",
    loading: {
      data: "Loading staff shifts",
      staff: "Loading staff data",
    },
    title: "{fullname} shifts",
  },
};
