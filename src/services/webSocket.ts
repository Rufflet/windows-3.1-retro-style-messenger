import type { Dispatch } from "core";
import chatsAPI from "api/chats";
import { transformMessages, transformMessage, apiHasError } from "utils";
import { logout } from "./auth";
import type {
  CreateConnectionPayload,
  SendMessagePayload,
} from "./types/sockets";

const BASE_URL = "wss://ya-praktikum.tech/ws";

export const createConnection = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateConnectionPayload
) => {
  const tokenResponse = await chatsAPI.getToken(action.chatId);

  if (apiHasError(tokenResponse)) {
    dispatch(logout);
    return;
  }

  const userID = state.user?.id;
  const socket = new WebSocket(
    `${BASE_URL}/chats/${userID}/${action.chatId}/${tokenResponse.token}`
  );

  socket.addEventListener("open", () => {
    dispatch({ socket });

    socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      })
    );
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
      if (!data.length) {
        dispatch({ messages: [] });
      } else {
        const messages = [
          ...window.store.getState().messages,
          ...transformMessages(data),
        ];
        dispatch({ messages });
      }
    } else if (typeof data === "object" && data.type === "message") {
      const messages = [
        ...window.store.getState().messages,
        transformMessage(data),
      ];
      dispatch({ messages });
    }
  });

  socket.addEventListener("error", (event: Event) => {
    console.log("Ошибка", event);
  });

  setInterval(() => {
    socket.send(JSON.stringify({ type: "ping" }));
  }, 30000);
};

export const sendMessage = async (
  _dispatch: Dispatch<AppState>,
  state: AppState,
  action: SendMessagePayload
) => {
  if (!state.socket) {
    return;
  }

  state.socket.send(
    JSON.stringify({
      content: action.message,
      type: "message",
    })
  );
};
