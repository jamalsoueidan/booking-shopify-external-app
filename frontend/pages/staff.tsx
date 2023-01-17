import LoadingSpinner from "@components/LoadingSpinner";
import Metadata from "@components/staff/Metadata";
import { StaffForm } from "@components/staff/_form";
import { useStaff, useStaffUpdate } from "@services/staff";
import { Suspense, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  const { data: staff } = useStaff();
  const { update } = useStaffUpdate();

  const submit = useCallback(
    async (fieldValues: any) => {
      await update(fieldValues);
    },
    [update, navigate]
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
