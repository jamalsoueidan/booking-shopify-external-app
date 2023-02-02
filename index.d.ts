interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload?: T;
}

interface ShopQuery {
  shop: string;
}

interface Session {
  _id: string;
  staff: string;
  shop: string;
  role: number;
  group: string;
  iat?: number;
  exp?: number;
}

interface ControllerProps<Q = any, B = any> {
  query: Q;
  body: B;
  session: Session;
}

declare namespace Express {
  export interface Request {
    session?: Session;
  }
}
