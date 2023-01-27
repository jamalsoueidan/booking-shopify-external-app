import Metadata from "@components/staff/Metadata";
import { LoadingSpinner } from "@jamalsoueidan/bsf.bsf-pkg";
import { useStaff, useStaffUpdate } from "@services/staff";
import { Suspense, lazy, useCallback } from "react";

const StaffForm = lazy(() =>
  import("@jamalsoueidan/bsf.bsf-pkg").then((module) => ({
    default: module.StaffForm,
  })),
);

export default () => {
  const { data: staff } = useStaff();
  const { update } = useStaffUpdate();

  const submit = useCallback(
    async (fieldValues: unknown) => {
      await update(fieldValues);
    },
    [update],
  );

  if (!staff) {
    return <></>;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StaffForm
        data={staff}
        action={submit}
        titleMetadata={<Metadata active={staff.active} />}
        disallowEditing={{ group: false, active: false }}
      ></StaffForm>
    </Suspense>
  );
};
