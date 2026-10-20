import avatar from "assets/avatar.png";
import avatar1 from "assets/avatar1.png";
import avatar2 from "assets/avatar2.png";
import avatar3 from "assets/avatar3.png";
import avatar4 from "assets/avatar4.png";
import type { MockDatabase, StoredUser } from "./types";

const DEMO_PASSWORD = "1234567890";

const minutesAgo = (mins: number) =>
  new Date(Date.now() - mins * 60_000).toISOString();

export const DEMO_LOGIN = {
  login: "alex",
  password: DEMO_PASSWORD,
};

export function createSeedDatabase(): MockDatabase {
  const demoUser: StoredUser = {
    id: 1,
    login: "alex",
    first_name: "Alex",
    second_name: "Ershov",
    display_name: "Rufflet",
    avatar: avatar as string,
    phone: "88005553535",
    email: "alex@example.com",
    password: DEMO_PASSWORD,
  };

  const bots: StoredUser[] = [
    {
      id: 2,
      login: "bill",
      first_name: "Bill",
      second_name: "Gates",
      display_name: "Bill",
      avatar: avatar3 as string,
      phone: "11111111111",
      email: "bill@example.com",
      password: DEMO_PASSWORD,
    },
    {
      id: 3,
      login: "melinda",
      first_name: "Melinda",
      second_name: "French",
      display_name: "Melinda",
      avatar: avatar4 as string,
      phone: "22222222222",
      email: "melinda@example.com",
      password: DEMO_PASSWORD,
    },
    {
      id: 4,
      login: "steve",
      first_name: "Steve",
      second_name: "Jobs",
      display_name: "Steve",
      avatar: avatar1 as string,
      phone: "33333333333",
      email: "steve@example.com",
      password: DEMO_PASSWORD,
    },
    {
      id: 5,
      login: "chuck",
      first_name: "Chuck",
      second_name: "Norris",
      display_name: "Chuck",
      avatar: avatar2 as string,
      phone: "44444444444",
      email: "chuck@example.com",
      password: DEMO_PASSWORD,
    },
  ];

  const lastMessageUser = (bot: StoredUser) => ({
    login: bot.login,
    first_name: bot.first_name,
    second_name: bot.second_name,
    avatar: bot.avatar,
    phone: bot.phone,
    email: bot.email,
  });

  return {
    users: [demoUser, ...bots],
    sessionUserId: null,
    chats: [
      {
        id: 101,
        title: "Bill",
        avatar: avatar3 as string,
        created_by: 1,
        unread_count: 1,
        last_message: {
          user: lastMessageUser(bots[0]),
          time: minutesAgo(45),
          content: "Привет",
        },
      },
      {
        id: 102,
        title: "Melinda",
        avatar: avatar4 as string,
        created_by: 1,
        unread_count: 0,
        last_message: {
          user: lastMessageUser(bots[1]),
          time: minutesAgo(90),
          content: "Привет",
        },
      },
      {
        id: 103,
        title: "Steve",
        avatar: avatar1 as string,
        created_by: 1,
        unread_count: 0,
        last_message: {
          user: lastMessageUser(bots[2]),
          time: minutesAgo(60 * 24),
          content: "How about that?",
        },
      },
      {
        id: 104,
        title: "Chuck",
        avatar: avatar2 as string,
        created_by: 1,
        unread_count: 2,
        last_message: {
          user: lastMessageUser(bots[3]),
          time: minutesAgo(60 * 24 * 5),
          content: "Lorem Ipsum is simply dummy...",
        },
      },
    ],
    chatUsers: {
      101: [1, 2],
      102: [1, 3],
      103: [1, 4],
      104: [1, 5],
    },
    messages: {
      101: [
        {
          id: 1,
          user_id: 2,
          chat_id: 101,
          type: "message",
          time: minutesAgo(50),
          content: "Lorem ipsum dolor sit amet.",
          is_read: true,
          file: null,
        },
        {
          id: 2,
          user_id: 2,
          chat_id: 101,
          type: "message",
          time: minutesAgo(49),
          content: "Lorem, ipsum dolor.",
          is_read: true,
          file: null,
        },
        {
          id: 3,
          user_id: 1,
          chat_id: 101,
          type: "message",
          time: minutesAgo(48),
          content: "Lorem ipsum dolor sit.",
          is_read: true,
          file: null,
        },
        {
          id: 4,
          user_id: 2,
          chat_id: 101,
          type: "message",
          time: minutesAgo(47),
          content: "Привет",
          is_read: false,
          file: null,
        },
      ],
      102: [
        {
          id: 5,
          user_id: 3,
          chat_id: 102,
          type: "message",
          time: minutesAgo(90),
          content: "Привет",
          is_read: true,
          file: null,
        },
      ],
      103: [
        {
          id: 6,
          user_id: 4,
          chat_id: 103,
          type: "message",
          time: minutesAgo(60 * 24),
          content: "How about that?",
          is_read: true,
          file: null,
        },
      ],
      104: [
        {
          id: 7,
          user_id: 5,
          chat_id: 104,
          type: "message",
          time: minutesAgo(60 * 24 * 5),
          content: "Lorem Ipsum is simply dummy...",
          is_read: false,
          file: null,
        },
        {
          id: 8,
          user_id: 5,
          chat_id: 104,
          type: "message",
          time: minutesAgo(60 * 24 * 5 - 5),
          content: "Roundhouse kick!",
          is_read: false,
          file: null,
        },
      ],
    },
    tokens: {},
    nextIds: {
      user: 6,
      chat: 105,
      message: 9,
    },
  };
}
