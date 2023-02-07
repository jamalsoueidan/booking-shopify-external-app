import { AppControllerProps, ShopQuery } from "@jamalsoueidan/bsb.bsb-pkg";
import * as ProductService from "@services/Product.service";

interface GetBookingQuery extends ShopQuery {}

export const getProducts = async ({
  query,
  session,
}: AppControllerProps<GetBookingQuery>) => {
  return ProductService.getProducts({ ...query, staff: session.staff });
};
