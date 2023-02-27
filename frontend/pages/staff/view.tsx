import { subject } from "@casl/ability";
import MetaData from "@components/staff/meta-data";
import { Schedule } from "@jamalsoueidan/pkg.bsb-types";
import {
  LoadingModal,
  LoadingPage,
  LoadingSpinner,
  useStaffGet,
  useStaffSchedule,
  useTranslation,
} from "@jamalsoueidan/pkg.bsf";

import { Card, Page } from "@shopify/polaris";
import { useAbility } from "application-ability";
import { Suspense, lazy, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default () => {
  const { t } = useTranslation({ id: "staff-schedule", locales });
  const ability = useAbility();
  const params = useParams();
  const navigate = useNavigate();
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
      breadcrumbs={[{ content: "staff", onAction: () => navigate("/admin/staff") }]}
      primaryAction={
        ability.can("update", subject("staff", staff)) && {
          content: t("edit", { fullname }),
          onAction: () => navigate("/admin/staff/edit/" + _id),
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
      <Card sectioned>
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
        <Card sectioned>
          <Suspense fallback={<LoadingSpinner />}>
            <ScheduleCalendar onChangeDate={setRangeDate} data={calendar} {...editSchedule} />
          </Suspense>
        </Card>
      </Card>
    </Page>
  );
};

const ScheduleCalendar = lazy(() =>
  import("@jamalsoueidan/pkg.bsf").then((module) => ({
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
