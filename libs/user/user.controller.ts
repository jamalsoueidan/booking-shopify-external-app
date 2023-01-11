import {
  StaffModel,
  UserModel,
} from "@jamalsoueidan/booking-shopify-backend.mongo.pkg";

export const current = async ({
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
  return UserModel.findById(session._id, "_id language timeZone");
};
