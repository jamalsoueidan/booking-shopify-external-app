import { UserModel } from "@jamalsoueidan/bsb.bsb-pkg";

export const user = async ({
  session,
}: ControllerProps<
  ShopQuery,
  ReceivePasswordBody
>): Promise<SettingsResponse> => {
  return UserModel.findById(session._id, "_id language timeZone");
};
