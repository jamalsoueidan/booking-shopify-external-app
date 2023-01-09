interface ProductStaff {
  staff: string;
  tag: string;
}
interface Product<T = ProductStaff> {
  _id: string;
  productId: number;
  active: boolean;
  hidden: boolean;
  buffertime: number;
  collectionId: number;
  duration: number;
  shop: string;
  title: string;
  staff: T[];
  imageUrl: string;
}
