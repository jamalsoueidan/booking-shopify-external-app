import { UserModel } from "@jamalsoueidan/bsb.bsb-pkg";

export const user = async ({
  session,
}: ControllerProps<
  ShopQuery,
  ReceivePasswordBody
>): Promise<SettingsResponse> => {
  return UserModel.findById(session._id, "_id language timeZone");
};

export const update = async ({
  body,
  session,
}: ControllerProps<
  ShopQuery,
  SettingsUpdateBodyRequest
>): Promise<SettingsResponse> => {
  return UserModel.findByIdAndUpdate(
    { _id: session._id },
    {
      timeZone: body.timeZone,
      language: body.language,
    },
    { new: true, fields: "_id language timeZone" }
  );
};
