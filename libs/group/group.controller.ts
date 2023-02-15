import { AppControllerProps, ShopQuery } from "@jamalsoueidan/pkg.bsb";
import * as StaffService from "@services/Staff.service";

export const getStaff = ({ query, session }: AppControllerProps<ShopQuery>) => {
  return StaffService.getAllByGroup({
    shop: query.shop,
    group: session.group,
  });
};
