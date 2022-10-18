import avatar from "assets/avatar.png";
import avatar1 from "assets/avatar1.png";
import avatar2 from "assets/avatar2.png";
import avatar3 from "assets/avatar3.png";
import avatar4 from "assets/avatar4.png";

export const signIn = {
  login: "alex",
  password: "1234567890",
};

export const signUp = {
  login: "alex",
  password: "1234567890",
  password2: "",
  email: "rufflet@ya.ru",
  phone: "88005553535",
  first_name: "Alex",
  second_name: "Ershov",
};

export const profile = {
  avatar,
  email: "rufflet@ya.ru",
  login: "alex",
  first_name: "Alex",
  second_name: "Ershov",
  display_name: "Rufflet",
  phone: "88005553535",
};

export const chatList = {
  chatList: [
    {
      avatar: avatar3,
      name: "Bill",
      message: "Привет",
      time: "11:15",
      count: 1,
    },
    {
      avatar: avatar4,
      name: "Melinda",
      short_message: "Привет",
      time: "10:32",
      count: 0,
    },
    {
      avatar: avatar1,
      name: "Steve",
      message: "How about that?",
      time: "Вт",
      count: 0,
    },
    {
      avatar: avatar2,
      name: "Chuck",
      message: "Lorem Ipsum is simply dummy...",
      time: "1 мая 2022",
      count: 2,
    },
  ],
};

export const chat = {
  name: "Bill",
  avatar: avatar3,
  messages: [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet.",
      user_id: 3,
      date: "16:20",
      read: true,
    },
    {
      id: 2,
      text: "Lorem, ipsum dolor.",
      user_id: 3,
      date: "16:21",
      read: true,
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit.",
      user_id: 0,
      date: "16:22",
      read: true,
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur.",
      user_id: 3,
      date: "16:22",
      read: true,
    },
    {
      id: 5,
      text: "Lorem.",
      user_id: 0,
      date: "16:24",
      read: true,
    },
    {
      id: 6,
      text: "Lorem, ipsum.",
      user_id: 3,
      date: "16:26",
      read: true,
    },
  ],
};
