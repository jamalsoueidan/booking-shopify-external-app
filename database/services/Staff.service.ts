import StaffModel from "@models/Staff.model";

interface FindStaffByEmailProps {
  shop: string;
  email: string;
}

export const findStaffByEmail = (document: FindStaffByEmailProps) => {
  return StaffModel.findOne(document).lean();
};

interface FindStaffByPhoneProps {
  shop: string;
  phone: string;
}

export const findStaffByPhone = (document: FindStaffByPhoneProps) => {
  return StaffModel.findOne(document).lean();
};
