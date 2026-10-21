import avatar from "assets/avatar.png";
import avatar1 from "assets/avatar1.png";
import avatar2 from "assets/avatar2.png";
import avatar3 from "assets/avatar3.png";
import avatar4 from "assets/avatar4.png";

export const signIn = {
  login: "demo",
  password: "12345",
};

export const signUp = {
  login: "demo",
  password: "12345",
  password2: "",
  email: "demo@example.com",
  phone: "+1 555 010 1234",
  first_name: "Alex",
  second_name: "Ershov",
};

export const profile = {
  avatar,
  email: "demo@example.com",
  login: "demo",
  first_name: "Alex",
  second_name: "Ershov",
  display_name: "Rufflet",
  phone: "+1 555 010 1234",
};

export const chatList = {
  chatList: [
    {
      avatar: avatar3,
      name: "Bill Gates",
      message: "Most of them. And yes, we licensed Start Me Up.",
      time: "8/24/95",
      count: 1,
    },
    {
      avatar: avatar4,
      name: "Melinda French",
      short_message: "A single-speed CD-ROM is enough.",
      time: "3/22/93",
      count: 0,
    },
    {
      avatar: avatar1,
      name: "Steve Jobs",
      message: "Four products. Consumer, pro, desktop, portable.",
      time: "9/16/97",
      count: 0,
    },
    {
      avatar: avatar2,
      name: "Linus Torvalds",
      message:
        "It won't be big and professional like GNU. The ftp folder is called Linux.",
      time: "8/25/91",
      count: 2,
    },
  ],
};

export const chat = {
  name: "Bill Gates",
  avatar: avatar3,
  messages: [
    {
      id: 1,
      text: "Chicago shipped this morning. The box says Windows 95.",
      user_id: 3,
      date: "8/24/95",
      read: true,
    },
    {
      id: 2,
      text: "Press Start. Programs, settings, everything hangs off that button.",
      user_id: 3,
      date: "8/24/95",
      read: true,
    },
    {
      id: 3,
      text: "Will my old 3.1 apps still open?",
      user_id: 0,
      date: "8/24/95",
      read: true,
    },
    {
      id: 4,
      text: "Most of them. And yes, we licensed Start Me Up.",
      user_id: 3,
      date: "8/24/95",
      read: false,
    },
  ],
};
