import MetaData from "@components/staff/meta-data";
import { StaffForm } from "@jamalsoueidan/pkg.bsf";
import { useStaffGet, useStaffUpdate } from "@services/staff";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: staff } = useStaffGet({ userId: params.id });
  const { update } = useStaffUpdate({ userId: params.id });

  const submit = useCallback(
    async (fieldValues: any) => {
      await update(fieldValues);
      navigate("/staff/" + staff._id);
    },
    [update, navigate, staff],
  );

  if (!staff) {
    return <></>;
  }

  return (
    <StaffForm
      data={staff}
      action={submit}
      breadcrumbs={[{ content: "Staff", onAction: () => navigate("/staff/" + staff._id) }]}
      titleMetadata={<MetaData active={staff.active} />}
      allowEditing={{ group: true, active: true, role: true }}
    />
  );
};
