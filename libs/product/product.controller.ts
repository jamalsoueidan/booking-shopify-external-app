import { AppControllerProps, ShopQuery } from "@jamalsoueidan/pkg.bsb";
import * as ProductService from "@services/Product.service";

export const getProducts = async ({
  query,
  session,
}: AppControllerProps<ShopQuery>) => {
  return ProductService.getProducts({ ...query, staff: session.staff });
};
