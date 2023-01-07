interface User {
  _id: string;
  shop: string;
  staff: string;
  email: string;
  phone: string;
  password: string;
}

interface ReceivePasswordBody {
  phone: string;
}

interface ReceivePasswordResponse {
  message: string;
}

interface LoginBody {
  identification: string;
  password: string;
}

interface LoginResponse {
  token: string;
}
