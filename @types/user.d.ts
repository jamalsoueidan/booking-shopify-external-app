interface User {
  _id: string;
  shop: string;
  staff: string;
  email: string;
  phone: string;
  password: string;
  language: string;
  timeZone: string;
  role: number;
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

interface SettingsResponse {
  _id: string;
  language: string;
  timeZone: string;
}

interface SettingsUpdateBodyRequest extends Omit<SettingsResponse, "_id"> {}
