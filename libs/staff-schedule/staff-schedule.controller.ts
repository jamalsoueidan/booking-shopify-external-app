import {
  AppControllerProps,
  ScheduleServiceCreate,
  ScheduleServiceCreateGroup,
  ScheduleServiceCreateGroupProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDestroy,
  ScheduleServiceDestroyGroup,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAll,
  ScheduleServiceGetAllProps,
  ScheduleServiceUpdate,
  ScheduleServiceUpdateGroup,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
  StaffServiceFindOne,
} from "@jamalsoueidan/pkg.bsb";

export const get = ({ query, session }: AppControllerProps<Omit<ScheduleServiceGetAllProps, "staff">>) => {
  const { shop, start, end } = query;
  const { staff } = session;
  return ScheduleServiceGetAll({ shop, staff, start, end });
};

export const create = ({ body, session }: AppControllerProps<null, ScheduleServiceCreateProps["body"]>) =>
  ScheduleServiceCreate(session, body);

export const update = async ({
  query,
  body,
  session,
}: AppControllerProps<null, ScheduleServiceUpdateProps["body"]>) => {
  const exists = await StaffServiceFindOne({ _id: session.staff, shop: session.shop });
  if (exists) {
    return ScheduleServiceUpdate(query, body);
  }
};

export const destroy = ({ query, session }: AppControllerProps<Omit<ScheduleServiceDestroyProps, "staff">>) => {
  const { shop, schedule } = query;
  const { staff } = session;
  console.log("delete", query);
  return ScheduleServiceDestroy({
    schedule,
    staff,
    shop,
  });
};

export const createGroup = ({ body, session }: AppControllerProps<null, ScheduleServiceCreateGroupProps["body"]>) =>
  ScheduleServiceCreateGroup(session, body);

export const updateGroup = async ({
  query,
  body,
  session,
}: AppControllerProps<Omit<ScheduleServiceUpdateGroupQueryProps, "staff">, ScheduleServiceUpdateGroupBodyProps>) =>
  ScheduleServiceUpdateGroup(
    {
      groupId: query.groupId,
      ...session,
    },
    body,
  );

export const destroyGroup = async ({
  query,
  session,
}: AppControllerProps<Omit<ScheduleServiceDestroyGroupProps, "staff">>) =>
  ScheduleServiceDestroyGroup({ ...query, ...session });
