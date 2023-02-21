import {
  AppControllerProps,
  StaffBodyUpdate,
  StaffServiceFindByIdAndUpdate,
  StaffServiceFindOne,
} from "@jamalsoueidan/pkg.bsb";

export const get = ({ session }: AppControllerProps) => {
  const { staff, shop } = session;
  return StaffServiceFindOne({ _id: staff, shop });
};

export const update = ({ body, session }: AppControllerProps<never, StaffBodyUpdate>) => {
  const id = session.staff;
  delete body.group;
  delete body.active;

  return StaffServiceFindByIdAndUpdate(id, body);
};
