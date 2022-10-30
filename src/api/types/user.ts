import { APIError, UserDTO } from "api/types/auth";

export type ChangeUserDataRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangeUserDataResponse = UserDTO | APIError;

export type ChangeAvatarRequest = {
  avatar: FormData;
};

export type ChangeUserPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ChangeUserPasswordResponse = APIError;

export type SearchUserRequest = {
  login: string;
};
