import { Schedule } from "@jamalsoueidan/pkg.bsb-types";
import {
  LoadingSpinner,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
  useToast,
  useTranslation,
} from "@jamalsoueidan/pkg.bsf";
import {
  useStaffScheduleDestroy,
  useStaffScheduleDestroyGroup,
  useStaffScheduleGetGroup,
  useStaffScheduleUpdateGroup,
} from "@services/staff/schedule";
import { Modal } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useRef } from "react";

const EditManyShifts = lazy(() =>
  import("@jamalsoueidan/pkg.bsf").then((module) => ({
    default: module.ScheduleFormManyShifts,
  })),
);

interface EditManyScheduleProps {
  schedule: Schedule;
  close: () => void;
}

export const EditManyShiftsModal = ({ schedule, close }: EditManyScheduleProps) => {
  const ref = useRef<ScheduleFormManyShiftsRefMethod>();
  const { show } = useToast();
  const { t } = useTranslation({ id: "edit-many-shifts-modal", locales });

  const { data: group } = useStaffScheduleGetGroup({
    groupId: schedule.groupId,
    staff: schedule.staff,
  });

  const { updateGroup } = useStaffScheduleUpdateGroup({
    groupId: schedule.groupId,
    staff: schedule.staff,
  });

  const { destroyGroup } = useStaffScheduleDestroyGroup({
    groupId: schedule.groupId,
    staff: schedule.staff,
  });

  const { destroy } = useStaffScheduleDestroy({
    schedule: schedule._id,
    staff: schedule.staff,
  });

  const onDestroy = useCallback(() => {
    destroyGroup();
    close();
  }, [destroyGroup]);

  const onDestroyOne = useCallback(() => {
    destroy();
    close();
  }, [destroy]);

  const onSubmit = useCallback(
    (fieldValues: ScheduleFormManyShiftsBody): ScheduleFormManyShiftsSubmitResult => {
      updateGroup(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [updateGroup, show, t],
  );

  const submit = useCallback(() => {
    const noErrors = ref.current.submit().length === 0;
    if (noErrors) {
      close();
    }
  }, [close]);

  console.log(group);

  return (
    <Modal
      open={true}
      onClose={close}
      title={t("title")}
      primaryAction={{
        content: t("save_changes"),
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: t("destroy_one"),
          destructive: true,
          onAction: onDestroyOne,
        },
        {
          content: t("destroy"),
          destructive: true,
          onAction: onDestroy,
        },
      ]}
    >
      <Modal.Section>
        <Suspense fallback={<LoadingSpinner />}>
          {group && <EditManyShifts data={group} onSubmit={onSubmit} ref={ref} />}
        </Suspense>
      </Modal.Section>
    </Modal>
  );
};

const locales = {
  da: {
    title: "Redigere vagtplaner",
    success: "Vagtplaner redigeret",
    save_changes: "Gem ændringer",
    destroy: "Slet alle",
    destroy_one: "Slet pågældende",
  },
  en: {
    title: "Edit shifts",
    success: "Shifts edited",
    save_changes: "Save changes",
    destroy: "Delete all",
    destroy_one: "Delete one",
  },
};
