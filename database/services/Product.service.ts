import { ProductModel, ShopQuery } from "@jamalsoueidan/pkg.bsb";

interface GetProductsProps extends ShopQuery {
  staff: string;
}

export const getProducts = ({ shop, staff }: GetProductsProps) => {
  return ProductModel.find({ shop, "staff.staff": { $in: staff } });
};
