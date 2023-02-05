import { ShopQuery } from "@jamalsoueidan/bsb.bsb-pkg";
import * as ProductService from "@services/Product.service";
import { ControllerProps } from "index.types";

interface GetBookingQuery extends ShopQuery {}

export const getProducts = async ({
  query,
  session,
}: ControllerProps<GetBookingQuery>) => {
  return ProductService.getProducts({ ...query, staff: session.staff });
};
