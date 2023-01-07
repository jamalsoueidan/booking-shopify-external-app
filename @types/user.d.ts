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

interface ReceivePasswordReturn {
  message: string;
}

interface LoginBody {
  identification: string;
  password: string;
}
