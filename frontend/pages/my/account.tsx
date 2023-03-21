import { BadgeStatus, StaffForm } from "@jamalsoueidan/pkg.frontend";
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

  return <StaffForm data={staff} action={submit} titleMetadata={<BadgeStatus active={staff.active} />} />;
};
