export type SignInPayload = {
  login: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  password2: string;
};
