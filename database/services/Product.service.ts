import ProductModel from "@models/Product.model";

interface GetProductsProps extends ShopQuery {
  staff: string;
}

export const getProducts = ({ shop, staff }: GetProductsProps) => {
  return ProductModel.find({ shop, "staff.staff": { $in: staff } });
};
