import type {
  GetUserResponseData,
  SignInRequestData,
  SignInResponseData,
  SignUpRequestData,
  SignUpResponseData,
} from "./types/auth";
import HTTPTransport from "../core/HTTPTransport";

console.log(process.env.API_ENDPOINT);
const authAPIInstance = new HTTPTransport(`${process.env.API_ENDPOINT}/auth`);

class AuthAPI {
  signIn(data: SignInRequestData) {
    return authAPIInstance
      .post("/signin", { data })
      .then(({ response }) => response as SignInResponseData);
  }

  signUp(data: SignUpRequestData) {
    return authAPIInstance
      .post("/signup", { data })
      .then(({ response }) => response as SignUpResponseData);
  }

  me() {
    return authAPIInstance
      .get("/user")
      .then(({ response }) => response as GetUserResponseData);
  }

  logout() {
    return authAPIInstance.post("/logout", {}).then(({ response }) => response);
  }
}

export default new AuthAPI();
