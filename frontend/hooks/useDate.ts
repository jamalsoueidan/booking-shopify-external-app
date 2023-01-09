import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { useCallback } from "react";
import { useUserSetting } from "@services/user";

export const useDate = () => {
  const { data } = useUserSetting();

  const toTimeZone = useCallback(
    (fromUTC: string | Date) => utcToZonedTime(fromUTC, data?.timeZone),
    [data?.timeZone]
  );

  const toUtc = useCallback(
    (date: string | Date) => zonedTimeToUtc(date, data?.timeZone),
    [data?.timeZone]
  );

  return {
    toTimeZone,
    toUtc,
  };
};
