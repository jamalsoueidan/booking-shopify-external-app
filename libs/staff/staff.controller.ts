import {
  StaffBodyUpdate,
  StaffServiceFindByIdAndUpdate,
  StaffServiceFindOne,
} from "@jamalsoueidan/booking-shopify-backend.mongo.pkg";

export const get = ({ session }: ControllerProps) => {
  const { staff, shop } = session;
  return StaffServiceFindOne({ _id: staff, shop });
};

export const update = ({
  body,
  session,
}: ControllerProps<any, StaffBodyUpdate>) => {
  const id = session.staff;
  return StaffServiceFindByIdAndUpdate(id, body);
};
