import { AppControllerProps, ShopQuery } from "@jamalsoueidan/bsb.bsb-pkg";
import * as StaffService from "@services/Staff.service";

export const getStaff = ({ query, session }: AppControllerProps<ShopQuery>) => {
  return StaffService.getAllByGroup({
    shop: query.shop,
    group: session.group,
  });
};
