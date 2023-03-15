import MetaData from "@components/staff/meta-data";
import { StaffBodyUpdate } from "@jamalsoueidan/pkg.backend-types";
import { StaffForm, useStaffGet, useStaffUpdate } from "@jamalsoueidan/pkg.frontend";

import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: staff } = useStaffGet({ userId: params.id });
  const { update } = useStaffUpdate({ userId: params.id });

  const submit = useCallback(
    async (fieldValues: StaffBodyUpdate) => {
      await update(fieldValues);
      navigate("/admin/staff/" + staff._id);
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
      breadcrumbs={{ content: "Staff", url: "/admin/staff/" + staff._id }}
      titleMetadata={<MetaData active={staff.active} />}
      allowEditing={{ active: true, group: true, role: true }}
    />
  );
};
