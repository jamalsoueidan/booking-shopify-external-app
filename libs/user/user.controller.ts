import { ShopQuery, UserModel, UserReceivePasswordBodyRequest, UserSettingsResponse, UserSettingsUpdateBodyRequest } from "@jamalsoueidan/bsb.bsb-pkg";
import { ControllerProps } from "index.types";

export const user = async ({
  session,
}: ControllerProps<
  ShopQuery,
  UserReceivePasswordBodyRequest
>): Promise<UserSettingsResponse> => {
  return UserModel.findById(session._id, "_id language timeZone");
};

export const update = async ({
  body,
  session,
}: ControllerProps<
  ShopQuery,
  UserSettingsUpdateBodyRequest
>): Promise<UserSettingsResponse> => {
  return UserModel.findByIdAndUpdate(
    { _id: session._id },
    {
      timeZone: body.timeZone,
      language: body.language,
    },
    { new: true, fields: "_id language timeZone" }
  );
};
