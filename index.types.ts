export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload?: T;
}

export interface ShopQuery {
  shop: string;
}

export interface Session {
  _id: string;
  staff: string;
  shop: string;
  role: number;
  group: string;
  iat?: number;
  exp?: number;
}

export interface ControllerProps<Q = any, B = any> {
  query: Q;
  body: B;
  session: Session;
}

declare namespace Express {
  export interface Request {
    session?: Session;
  }
}
