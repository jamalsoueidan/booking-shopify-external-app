import StaffModel from "@models/Staff.model";
import UserModel from "@models/User.model";

export const staff = async ({
  session,
}: ControllerProps<ShopQuery, ReceivePasswordBody>): Promise<Staff> => {
  return StaffModel.findById(session.staff);
};

export const user = async ({
  session,
}: ControllerProps<
  ShopQuery,
  ReceivePasswordBody
>): Promise<SettingsResponse> => {
  return UserModel.findById(session._id, "_id, language, timeZone");
};
