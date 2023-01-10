import * as ProductService from "@services/Product.service";

interface GetBookingQuery extends ShopQuery {}

export const getProducts = async ({
  query,
  session,
}: ControllerProps<GetBookingQuery>) => {
  return ProductService.getProducts({ ...query, staff: session.staff });
};
