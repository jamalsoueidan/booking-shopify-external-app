import {
  AppControllerProps,
  StaffBodyUpdate,
  StaffModel,
  StaffServiceFindByIdAndUpdate,
  StaffServiceFindOne,
  StaffSettingsResponse,
  StaffSettingsUpdateBodyRequest,
} from "@jamalsoueidan/pkg.bsb";

export const getSettings = ({ session }: AppControllerProps<never, never>) =>
  StaffModel.findById(session.staff, "_id language timeZone");

export const updateSettings = async ({
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

export const getAccount = ({ session }: AppControllerProps) => {
  const { staff, shop } = session;
  return StaffServiceFindOne({ _id: staff, shop });
};

export const updateAccount = ({ body, session }: AppControllerProps<never, StaffBodyUpdate>) => {
  const id = session.staff;
  delete body.group;
  delete body.active;
  return StaffServiceFindByIdAndUpdate(id, body);
};
