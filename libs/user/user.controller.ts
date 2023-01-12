import { UserModel } from "@jamalsoueidan/booking-shopify-backend.mongo.pkg";

export const user = async ({
  session,
}: ControllerProps<
  ShopQuery,
  ReceivePasswordBody
>): Promise<SettingsResponse> => {
  return UserModel.findById(session._id, "_id language timeZone");
};
