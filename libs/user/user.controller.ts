import {
  AppControllerProps,
  StaffModel,
  StaffUserSettingsResponse,
  StaffUserSettingsUpdateBodyRequest,
} from "@jamalsoueidan/pkg.bsb";

export const user = async ({ session }: AppControllerProps<never, never>): Promise<StaffUserSettingsResponse> => {
  const staff = await StaffModel.findById(session._id, "_id language timeZone");
  return {
    timeZone: staff.user.timeZone,
    language: staff.user.language,
  };
};

export const update = async ({
  body,
  session,
}: AppControllerProps<never, StaffUserSettingsUpdateBodyRequest>): Promise<StaffUserSettingsResponse> => {
  return StaffModel.findByIdAndUpdate(
    { _id: session._id },
    {
      user: {
        timeZone: body.timeZone,
        language: body.language,
      },
    },
    { new: true, fields: "_id user.language user.timeZone" },
  );
};
