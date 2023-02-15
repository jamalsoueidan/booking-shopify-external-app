import { AppControllerProps, UserModel, UserSettingsResponse, UserSettingsUpdateBodyRequest } from "@jamalsoueidan/pkg.bsb";


export const user = async ({
  session,
}: AppControllerProps<
  never,
  never
>): Promise<UserSettingsResponse> => {
  return UserModel.findById(session._id, "_id language timeZone");
};

export const update = async ({
  body,
  session,
}: AppControllerProps<
  never,
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
