import Metadata from "@components/staff/meta-data";
import { StaffForm } from "@jamalsoueidan/pkg.bsf";
import { useAccount, useAccountUpdate } from "@services/account";
import { useCallback } from "react";

export default () => {
  const { data: staff } = useAccount();
  const { update } = useAccountUpdate();

  const submit = useCallback(
    async (fieldValues: unknown) => {
      await update(fieldValues);
    },
    [update],
  );

  if (!staff) {
    return <></>;
  }

  return <StaffForm data={staff} action={submit} titleMetadata={<Metadata active={staff.active} />} />;
};
