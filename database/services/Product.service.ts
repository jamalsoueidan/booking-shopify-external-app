import { ProductModel } from "@jamalsoueidan/booking-shopify-backend.mongo.pkg";

interface GetProductsProps extends ShopQuery {
  staff: string;
}

export const getProducts = ({ shop, staff }: GetProductsProps) => {
  return ProductModel.find({ shop, "staff.staff": { $in: staff } });
};
