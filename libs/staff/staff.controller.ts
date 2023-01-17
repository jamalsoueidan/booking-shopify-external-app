import {
  StaffBodyUpdate,
  StaffServiceFindByIdAndUpdate,
  StaffServiceFindOne,
} from "@jamalsoueidan/bsb.bsb-pkg";
import { matchedData } from "express-validator";

export const get = ({ session }: ControllerProps) => {
  const { staff, shop } = session;
  return StaffServiceFindOne({ _id: staff, shop });
};

export const update = ({
  body,
  session,
}: ControllerProps<any, StaffBodyUpdate>) => {
  const id = session.staff;
  delete body.group;
  delete body.active;

  return StaffServiceFindByIdAndUpdate(id, body);
};
