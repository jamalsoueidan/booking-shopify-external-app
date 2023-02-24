import { ScheduleServiceDestroyGroupProps } from "@jamalsoueidan/pkg.bsb";
import {
  ApiResponse,
  Schedule,
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceCreateGroupQueryProps,
  ScheduleServiceCreateProps,
  ScheduleServiceCreateQueryProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAllProps,
  ScheduleServiceGetGroupProps,
  ScheduleServiceGetGroupReturn,
  ScheduleServiceUpdateBodyProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateQueryProps,
} from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

export const useStaffSchedule = ({ start, end, staff }: ScheduleServiceGetAllProps) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<Schedule>>>({
    enabled: !!start && !!end,
    queryFn: () => get(`/schedules?start=${start.toJSON()}&end=${end.toJSON()}&staff=${staff}`),
    queryKey: ["staff", "schedules", start?.toJSON(), end?.toJSON()],
  });

  return { data: data?.payload || [] };
};

export const useStaffScheduleCreate = ({ staff }: ScheduleServiceCreateQueryProps) => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const create = useCallback(
    async (body: ScheduleServiceCreateProps["body"]) => {
      setIsCreating(true);
      await post(`/schedules?staff=${staff}`, body);
      await mutate(["staff", "schedules"]);
      setIsCreating(false);
    },
    [mutate, post],
  );

  return {
    create,
    isCreating,
  };
};

export const useStaffScheduleDestroy = ({ schedule, staff }: ScheduleServiceDestroyProps) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const fetch = useFetch();
  const destroy = useCallback(async () => {
    setIsDestroying(true);
    await fetch.destroy(`/schedules/${schedule}?staff=${staff}`);
    await fetch.mutate(["staff", "schedules"]);
    setIsDestroying(false);
  }, [fetch, schedule]);

  return {
    destroy,
    isDestroying,
  };
};

export const useStaffScheduleUpdate = ({ schedule, staff }: ScheduleServiceUpdateQueryProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const update = useCallback(
    async (body: ScheduleServiceUpdateBodyProps) => {
      setIsUpdating(true);
      await put(`/schedules/${schedule}?staff=${staff}`, body);
      await mutate(["staff", "schedules"]);
      setIsUpdating(false);
    },
    [put, schedule, mutate],
  );

  return {
    isUpdating,
    update,
  };
};

export const useStaffScheduleGetGroup = ({ groupId, staff }: ScheduleServiceGetGroupProps) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<ScheduleServiceGetGroupReturn>>({
    queryFn: () => get(`/schedules/group/${groupId}?staff=${staff}`),
    queryKey: ["staff", "schedules", "group", groupId, staff],
  });

  return { data: data?.payload };
};

export const useStaffScheduleDestroyGroup = ({ groupId, staff }: ScheduleServiceDestroyGroupProps) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const { destroy, mutate } = useFetch();
  const destroyGroup = useCallback(async () => {
    setIsDestroying(true);
    await destroy(`/schedules/group/${groupId}?staff=${staff}`);
    await mutate(["staff", "schedules"]);
    setIsDestroying(false);
  }, [fetch, groupId]);

  return {
    destroyGroup,
    isDestroying,
  };
};

export const useStaffScheduleCreateGroup = ({ staff }: ScheduleServiceCreateGroupQueryProps) => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const createGroup = useCallback(
    async (body: ScheduleServiceCreateGroupBodyProps) => {
      setIsCreating(true);
      await post(`/schedules/group?staff=${staff}`, body);
      await mutate(["staff", "schedules"]);
      setIsCreating(false);
    },
    [mutate, post],
  );

  return {
    createGroup,
    isCreating,
  };
};

export const useStaffScheduleUpdateGroup = ({ groupId, staff }: ScheduleServiceUpdateGroupQueryProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const updateGroup = useCallback(
    async (body: ScheduleServiceUpdateGroupBodyProps) => {
      setIsUpdating(true);
      await put(`/schedules/group/${groupId}?staff=${staff}`, body);
      await mutate(["staff", "schedules"]);
      setIsUpdating(false);
    },
    [put, groupId, mutate],
  );

  return {
    isUpdating,
    updateGroup,
  };
};
