import {
  AppControllerProps,
  StaffModel,
  StaffSettingsResponse,
  StaffSettingsUpdateBodyRequest,
} from "@jamalsoueidan/pkg.bsb";

export const user = ({ session }: AppControllerProps<never, never>) =>
  StaffModel.findById(session.staff, "_id language timeZone");

export const update = async ({
  body,
  session,
}: AppControllerProps<never, StaffSettingsUpdateBodyRequest>): Promise<StaffSettingsResponse> => {
  return StaffModel.findByIdAndUpdate(
    { _id: session.staff },
    {
      timeZone: body.timeZone,
      language: body.language,
    },
    { new: true, fields: "_id language timeZone" },
  );
};
