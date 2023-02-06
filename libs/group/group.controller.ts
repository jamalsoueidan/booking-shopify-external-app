import * as StaffService from "@services/Staff.service";
import { ControllerProps } from "index.types";

export const getStaff = ({ query, session }: ControllerProps) => {
  return StaffService.getAllByGroup({
    shop: query.shop,
    group: session.group,
  });
};
