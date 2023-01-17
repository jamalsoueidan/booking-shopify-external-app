import {
  ScheduleBodyUpdate,
  ScheduleBodyUpdateOrCreate,
  ScheduleGetQuery,
  ScheduleModel,
  ScheduleServiceCreate,
  ScheduleServiceDestroy,
  ScheduleServiceFindByIdAndUpdate,
  ScheduleServiceGetByDateRange,
  ScheduleServiceUpdateGroup,
  ScheduleUpdateOrDestroyQuery,
  StaffServiceFindOne,
} from "@jamalsoueidan/bsb.bsb-pkg";

export const get = async ({
  query,
  session,
}: ControllerProps<Omit<ScheduleGetQuery, "staff">>) => {
  const { start, end } = query;
  const { shop, staff } = session;
  return await ScheduleServiceGetByDateRange({ shop, staff, start, end });
};

interface CreateQuery {
  shop: string;
  staff: string;
}

export const create = async ({
  session,
  body,
}: ControllerProps<CreateQuery, ScheduleBodyUpdateOrCreate>) => {
  const { shop, staff } = session;
  return ScheduleServiceCreate({ shop, staff, schedules: body });
};

interface UpdateQuery extends ScheduleUpdateOrDestroyQuery {
  shop: string;
}

export const update = async ({
  query,
  body,
  session,
}: ControllerProps<UpdateQuery, ScheduleBodyUpdate>) => {
  const { schedule } = query;
  const { shop, staff } = session;

  const exists = await StaffServiceFindOne({ _id: staff, shop });
  if (exists) {
    return await ScheduleServiceFindByIdAndUpdate(schedule, {
      groupId: null,
      ...body,
    });
  }
};

export const destroy = ({
  query,
  session,
}: ControllerProps<ScheduleUpdateOrDestroyQuery>) => {
  const { schedule } = query;
  const { shop } = session;
  return ScheduleServiceDestroy({ schedule, shop });
};

interface UpdateGroupQuery extends ScheduleUpdateOrDestroyQuery {
  groupId: string;
}

export const updateGroup = async ({
  query,
  body,
  session,
}: ControllerProps<UpdateGroupQuery, ScheduleBodyUpdate>) => {
  const { schedule, groupId } = query;
  const { staff, shop } = session;

  ScheduleServiceUpdateGroup({
    filter: {
      schedule,
      groupId,
      staff,
      shop,
    },
    body,
  });
};

interface DestroyGroupQuery extends ScheduleUpdateOrDestroyQuery {
  groupId: string;
}

export const destroyGroup = async ({
  query,
  session,
}: ControllerProps<DestroyGroupQuery>) => {
  const { schedule, groupId } = query;
  const { shop, staff } = session;

  const documents = await ScheduleModel.countDocuments({
    _id: schedule,
    staff,
    groupId,
    shop,
  });

  if (documents > 0) {
    return await ScheduleModel.deleteMany({ groupId, shop });
  } else {
    throw new Error("Groupid doesn't exist");
  }
};
