export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type SignInRequestData = {
  login: string;
  password: string;
};

export type SignInResponseData = APIError;

export type SignUpRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponseData =
  | {
      id: number;
    }
  | APIError;

export type GetUserResponseData = UserDTO | APIError;
