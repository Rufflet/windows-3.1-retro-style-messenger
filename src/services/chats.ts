import ChatsAPI from "api/chats";
import UserAPI from "api/user";
import type { Dispatch } from "core";
import { transformChats, apiHasError, transformUser } from "utils";
import { logout } from "./auth";
import type { CreateChatPayload, DeleteChatPayload } from "./types/chats";

export const getChats = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.get();

    dispatch({ isLoading: false });

    if (apiHasError(response)) {
      dispatch(logout);
      return;
    }

    dispatch({ chats: transformChats(response) });
  } catch (err) {
    console.error(err);
  }
};

export const createChat: DispatchStateHandler<CreateChatPayload> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.createChat(action);

    dispatch({ isLoading: false });

    if (apiHasError(response)) {
      dispatch(logout);
      return;
    }

    dispatch(getChats);
  } catch (err) {
    console.error(err);
  }
};

export const deleteChat: DispatchStateHandler<DeleteChatPayload> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.deleteChat(action);

    dispatch({ isLoading: false });

    if (!apiHasError(response)) {
      dispatch(getChats);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getChatUsers = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { chatId: number }
) => {
  try {
    dispatch({ isLoading: true });

    const result = await ChatsAPI.getChatUsers({ id: action.chatId });

    if (apiHasError(result)) {
      dispatch({
        isLoading: false,
      });
      return;
    }

    dispatch({
      isLoading: false,
      chatUsers: result.map((user) => transformUser(user)),
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { users: number[]; chatId: number }
) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.deleteUsersFromChat(action);

    if (apiHasError(response)) {
      dispatch({
        isLoading: false,
        removeUserError: response.reason,
      });
    }

    dispatch({ isLoading: false });
    dispatch(getChats);
    dispatch(getChatUsers, { chatId: action.chatId });
  } catch (err) {
    console.error(err);
  }
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { users: number[]; chatId: number }
) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.addUsersToChat(action);

    if (apiHasError(response)) {
      dispatch({
        isLoading: false,
        addUserError: response.reason,
      });
    }

    dispatch({ isLoading: false });
    dispatch(getChats);
    dispatch(getChatUsers, { chatId: action.chatId });
  } catch (err) {
    console.error(err);
  }
};

export const searchUser = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { login: string; chatId: number }
) => {
  try {
    dispatch({ isLoading: true });

    const userResult = await UserAPI.searchUserByLogin({ login: action.login });

    if (apiHasError(userResult)) {
      dispatch({
        isLoading: false,
        addUserError: userResult.reason,
      });
      return;
    }

    dispatch({
      isLoading: false,
      searchResults: userResult.map((user) => transformUser(user)),
    });
  } catch (err) {
    console.error(err);
  }
};
