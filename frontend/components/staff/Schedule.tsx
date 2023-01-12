import LoadingModal from "@components/LoadingModal";
import LoadingSpinner from "@components/LoadingSpinner";
import { EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { Schedule as ScheduleEvent } from "@jamalsoueidan/booking-shopify-backend.mongo.types";
import { Card } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useState } from "react";

const StaffCalendar = lazy(() => import("./StaffCalendar"));

const CreateScheduleModal = lazy(() => import("./modals/CreateScheduleModal"));

const EditScheduleModal = lazy(() => import("./modals/EditScheduleModal"));

interface ScheduleProps {
  events: ScheduleEvent[];
  onChangeDate: (value: CalendarDateChangeProps) => void;
}

export const Schedule = ({ events, onChangeDate }: ScheduleProps) => {
  const [showCreate, setShowCreate] = useState(null);
  const [showEdit, setShowEdit] = useState(null);

  const createSchedule = useCallback(
    (info: DateClickArg) => setShowCreate(info),
    []
  );

  const editSchedule = useCallback(
    (info: EventClickArg) => setShowEdit(info),
    []
  );

  return (
    <>
      {showCreate && (
        <Suspense fallback={<LoadingModal />}>
          <CreateScheduleModal info={showCreate} setInfo={setShowCreate} />
        </Suspense>
      )}
      {showEdit && (
        <Suspense fallback={<LoadingModal />}>
          <EditScheduleModal info={showEdit} setInfo={setShowEdit} />
        </Suspense>
      )}
      <Card sectioned>
        <Suspense fallback={<LoadingSpinner />}>
          <StaffCalendar
            onChangeDate={onChangeDate}
            data={events}
            create={createSchedule}
            edit={editSchedule}
          />
        </Suspense>
      </Card>
    </>
  );
};
