import {
  CreateOneShiftBody,
  CreateOneShiftRefMethod,
  CreateOneShiftSubmitResult,
  LoadingSpinner,
  useToast,
  useTranslation,
} from "@jamalsoueidan/pkg.bsf";
import { useStaffScheduleCreate } from "@services/staff/schedule";
import { Suspense, forwardRef, lazy, useCallback } from "react";

interface CreateDayScheduleProps {
  date: Date;
}

const CreateOneShift = lazy(() =>
  import("@jamalsoueidan/pkg.bsf").then((module) => ({
    default: module.CreateOneShift,
  })),
);

export const CreateOneShiftModal = forwardRef<CreateOneShiftRefMethod, CreateDayScheduleProps>(({ date }, ref) => {
  const { show } = useToast();
  const { t } = useTranslation({ id: "create-many-shifts-modal", locales });
  const { create } = useStaffScheduleCreate();

  const onSubmit = useCallback(
    (fieldValues: CreateOneShiftBody): CreateOneShiftSubmitResult => {
      create(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [create, show, t],
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateOneShift selectedDate={date} onSubmit={onSubmit} ref={ref} />
    </Suspense>
  );
});

const locales = {
  da: {
    success: "Vagtplan oprettet",
  },
  en: {
    success: "Shift created",
  },
};
