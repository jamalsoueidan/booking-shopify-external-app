import { LoadingPage } from "@jamalsoueidan/bsf.bsf-pkg";
import Metadata from "@components/staff/Metadata";
import { Schedule } from "@components/staff/Schedule";
import { useStaff } from "@services/staff";
import { useStaffSchedule } from "@services/staff/schedule";
import { Page } from "@shopify/polaris";
import { useState } from "react";

export default () => {
  const [rangeDate, setRangeDate] = useState<CalendarDateChangeProps>();

  const { data: staff } = useStaff();

  const { data: calendar } = useStaffSchedule({
    start: rangeDate?.start,
    end: rangeDate?.end,
  });

  if (!staff || !calendar) {
    return (
      <LoadingPage
        title={!staff ? "Loading staff data..." : "Loading schedules data..."}
      />
    );
  }

  const { fullname, active } = staff;

  return (
    <Page
      fullWidth
      title={fullname}
      titleMetadata={<Metadata active={active} />}
    >
      <Schedule events={calendar} onChangeDate={setRangeDate} />
    </Page>
  );
};
