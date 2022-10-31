import { Views } from "utils";
import { Dispatch } from "core";

declare global {
  export type Nullable<T> = T | null;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type TemplateProps = Record<string, unknown>;
  export type EventHandler = (e: Event) => void;
  export type DispatchStateHandler<TAction> = (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: TAction
  ) => Promise<void>;

  export type AppState = {
    appIsInited: boolean;
    view: Nullable<Views>;
    isLoading: boolean;
    signInFormError: Nullable<string>;
    signUpFormError: Nullable<string>;
    profileEditFormError: Nullable<string>;
    passwordChangeFormError: Nullable<string>;
    addUserError: Nullable<string>;
    removeUserError: Nullable<string>;
    user: Nullable<User>;
    chats: array<any>;
    messages: array<any>;
    chatUsers: array<any>;
    searchResults: array<any>;
    socket: any;
  };

  export type User = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
  };
}

export {};
