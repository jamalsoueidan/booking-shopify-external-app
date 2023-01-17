import { StaffModel } from "@jamalsoueidan/bsb.bsb-pkg";

interface FindByProps {
  shop: string;
  _id?: string;
  email?: string;
  phone?: string;
}

export const findBy = (document: FindByProps) => {
  return StaffModel.findOne({ ...document, active: true }).lean();
};
interface getAllByGroup extends ShopQuery {
  group: string;
}

export const getAllByGroup = async ({ shop, group }: getAllByGroup) => {
  if (!group) {
    return null;
  }

  return StaffModel.find({ shop, group }).lean();
};

interface GetIdsByGroup extends ShopQuery {
  group: string;
}

export const getIdsbyGroup = async ({ shop, group }: GetIdsByGroup) => {
  if (!group) {
    return null;
  }

  const users = await StaffModel.find({ shop, group }, "").lean();
  return users.map((user) => user._id);
};

interface isAllowed extends GetIdsByGroup {
  staff: string;
}

export const isAllowed = async ({ shop, group, staff }: isAllowed) => {
  const allStaff = await getIdsbyGroup({ shop, group });
  return !!allStaff.find((s) => s.toString() === staff);
};
