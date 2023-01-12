import { useFetch } from "@hooks";
import {
  ScheduleBodyUpdate,
  ScheduleBodyUpdateOrCreate,
  ScheduleGetQuery,
} from "@jamalsoueidan/booking-shopify-backend.mongo.pkg";
import {
  Schedule,
  ScheduleUpdateOrDestroyQuery,
} from "@jamalsoueidan/booking-shopify-backend.mongo.types";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

export const useStaffSchedule = ({
  start,
  end,
}: Omit<ScheduleGetQuery, "staff">) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<Schedule>>>({
    queryKey: ["schedules", start, end],
    queryFn: () => get(`schedules?start=${start}&end=${end}`),
    enabled: !!start && !!end,
  });

  return { data: data?.payload || [] };
};

type UseStaffScheduleCreateFunction = (
  body: ScheduleBodyUpdateOrCreate
) => void;

export const useStaffScheduleCreate = () => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const create: UseStaffScheduleCreateFunction = useCallback(async (body) => {
    setIsCreating(true);
    await post(`schedules`, body);
    await mutate(["schedules"]);
    setIsCreating(false);
  }, []);

  return {
    isCreating,
    create,
  };
};

type UseStaffScheduleDestroyFetch = (body: Pick<Schedule, "groupId">) => void;

export const useStaffScheduleDestroy = ({
  schedule,
}: Omit<ScheduleUpdateOrDestroyQuery, "staff">) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const fetch = useFetch();
  const destroy: UseStaffScheduleDestroyFetch = useCallback(
    async (body) => {
      setIsDestroying(true);
      await fetch.destroy(
        `schedules/${schedule}${body.groupId ? "/group/" + body.groupId : ""}`
      );
      await fetch.mutate(["schedules"]);
      setIsDestroying(false);
    },
    [setIsDestroying, fetch]
  );

  return {
    destroy,
    isDestroying,
  };
};

type UseStaffScheduleUpdateFetch = (body: ScheduleBodyUpdate) => void;

export const useStaffScheduleUpdate = ({
  schedule,
}: Omit<ScheduleUpdateOrDestroyQuery, "staff">) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const update: UseStaffScheduleUpdateFetch = useCallback(
    async (body) => {
      setIsUpdating(true);
      await put(
        `schedules/${schedule}${body.groupId ? "/group/" + body.groupId : ""}`,
        body
      );
      await mutate(["schedules"]);
      setIsUpdating(false);
    },
    [setIsUpdating, mutate, put]
  );

  return {
    update,
    isUpdating,
  };
};
