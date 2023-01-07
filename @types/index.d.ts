interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload?: T;
}

interface ShopQuery {
  shop: string;
}
