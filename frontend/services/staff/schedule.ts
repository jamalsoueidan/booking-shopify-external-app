import { useFetch } from "@hooks/use-fetch";
import { ScheduleServiceDestroyGroupProps } from "@jamalsoueidan/pkg.bsb";
import {
  ApiResponse,
  Schedule,
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAllProps,
  ScheduleServiceUpdateBodyProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateQueryProps,
} from "@jamalsoueidan/pkg.bsb-types";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

export const useStaffSchedule = ({ start, end }: Omit<ScheduleServiceGetAllProps, "staff">) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<Schedule>>>({
    enabled: !!start && !!end,
    queryFn: () => get(`schedules?start=${start.toJSON()}&end=${end.toJSON()}`),
    queryKey: ["staff", "schedules", start?.toJSON(), end?.toJSON()],
  });

  return { data: data?.payload || [] };
};

export const useStaffScheduleCreate = () => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const create = useCallback(
    async (body: ScheduleServiceCreateProps["body"]) => {
      setIsCreating(true);
      await post(`schedules`, body);
      await mutate(["staff"]);
      setIsCreating(false);
    },
    [mutate, post],
  );

  return {
    create,
    isCreating,
  };
};

export const useStaffScheduleDestroy = ({ schedule }: Omit<ScheduleServiceDestroyProps, "staff">) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const fetch = useFetch();
  const destroy = useCallback(async () => {
    setIsDestroying(true);
    await fetch.destroy(`schedules/${schedule}`);
    setIsDestroying(false);
  }, [fetch, schedule]);

  return {
    destroy,
    isDestroying,
  };
};

export const useStaffScheduleUpdate = ({ schedule }: Omit<ScheduleServiceUpdateQueryProps, "staff">) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const update = useCallback(
    async (body: ScheduleServiceUpdateBodyProps) => {
      setIsUpdating(true);
      await put(`schedules/${schedule}`, body);
      await mutate(["staff"]);
      setIsUpdating(false);
    },
    [put, schedule, mutate],
  );

  return {
    isUpdating,
    update,
  };
};

export const useStaffScheduleDestroyGroup = ({ groupId }: Omit<ScheduleServiceDestroyGroupProps, "staff">) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const fetch = useFetch();
  const destroyGroup = useCallback(async () => {
    setIsDestroying(true);
    await fetch.destroy(`schedules/group/${groupId}`);
    await fetch.mutate(["staff"]);
    setIsDestroying(false);
  }, [fetch, groupId]);

  return {
    destroyGroup,
    isDestroying,
  };
};

export const useStaffScheduleCreateGroup = () => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const createGroup = useCallback(
    async (body: ScheduleServiceCreateGroupBodyProps) => {
      setIsCreating(true);
      await post(`schedules/group`, body);
      await mutate(["staff"]);
      setIsCreating(false);
    },
    [mutate, post],
  );

  return {
    createGroup,
    isCreating,
  };
};

export const useStaffScheduleUpdateGroup = ({ groupId }: Omit<ScheduleServiceUpdateGroupQueryProps, "staff">) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const updateGroup = useCallback(
    async (body: ScheduleServiceUpdateGroupBodyProps) => {
      setIsUpdating(true);
      await put(`schedules/group/${groupId}`, body);
      await mutate(["staff"]);
      setIsUpdating(false);
    },
    [put, groupId, mutate],
  );

  return {
    isUpdating,
    updateGroup,
  };
};
