import { ShopQuery, StaffModel, StaffServiceGetStaffIdsbyGroup } from "@jamalsoueidan/pkg.bsb";

interface FindByProps {
  shop: string;
  _id?: string;
  email?: string;
  phone?: string;
}

export const findBy = (document: FindByProps) => {
  return StaffModel.findOne({ ...document, active: true });
};

interface getAllByGroup extends ShopQuery {
  group: string;
}

export const getAllByGroup = async ({ shop, group }: getAllByGroup) => {
  if (!group) {
    return null;
  }

  return StaffModel.find({ shop, group });
};

interface isAllowed extends ShopQuery {
  group: string;
  staff: string;
}

export const isAllowed = async ({ shop, group, staff }: isAllowed) => {
  const allStaff = await StaffServiceGetStaffIdsbyGroup({ shop, group });
  return !!allStaff.find((s) => s.toString() === staff);
};
