import HTTPTransport from "core/HTTPTransport";
import type { UserDTO } from "./types/auth";
import type {
  ChangeUserDataRequest,
  ChangeUserDataResponse,
  ChangeAvatarRequest,
  ChangeUserPasswordRequest,
  ChangeUserPasswordResponse,
  SearchUserRequest,
} from "./types/user";

const userAPIInstance = new HTTPTransport(
  "https://ya-praktikum.tech/api/v2/user"
);

class UserAPI {
  changeUserData(data: ChangeUserDataRequest) {
    return userAPIInstance
      .put("/profile", { data })
      .then(({ response }) => response as ChangeUserDataResponse);
  }

  changeAvatar(data: ChangeAvatarRequest) {
    return userAPIInstance
      .put("/profile/avatar", {
        data,
        isFile: true,
      })
      .then(({ response }) => response as UserDTO);
  }

  changeUserPassword(data: ChangeUserPasswordRequest) {
    return userAPIInstance
      .put("/password", { data })
      .then(({ response }) => response as ChangeUserPasswordResponse);
  }

  searchUserByLogin(data: SearchUserRequest) {
    return userAPIInstance
      .post("/search", { data })
      .then(({ response }) => response as UserDTO[]);
  }
}

export default new UserAPI();
