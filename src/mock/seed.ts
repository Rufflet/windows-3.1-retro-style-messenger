import avatar from "assets/avatar.png";
import avatar1 from "assets/avatar1.png";
import avatar2 from "assets/avatar2.png";
import avatar3 from "assets/avatar3.png";
import avatar4 from "assets/avatar4.png";
import type { MockDatabase, StoredUser } from "./types";

const DEMO_PASSWORD = "12345";

// Noon-ish UTC so the calendar day stays put in US and European timezones.
const at = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
) => new Date(Date.UTC(year, month - 1, day, hour, minute)).toISOString();

export const DEMO_LOGIN = {
  login: "demo",
  password: DEMO_PASSWORD,
};

export function createSeedDatabase(): MockDatabase {
  const demoUser: StoredUser = {
    id: 1,
    login: "demo",
    first_name: "Demo",
    second_name: "User",
    display_name: "demo",
    avatar: avatar as string,
    phone: "+1 555 010 1234",
    email: "demo@example.com",
    password: DEMO_PASSWORD,
  };

  const bots: StoredUser[] = [
    {
      id: 2,
      login: "bill",
      first_name: "Bill",
      second_name: "Gates",
      display_name: "Bill Gates",
      avatar: avatar3 as string,
      phone: "+1 555 010 1001",
      email: "bill@example.com",
      password: DEMO_PASSWORD,
    },
    {
      id: 3,
      login: "melinda",
      first_name: "Melinda",
      second_name: "French",
      display_name: "Melinda French",
      avatar: avatar4 as string,
      phone: "+44 20 7946 0958",
      email: "melinda@example.com",
      password: DEMO_PASSWORD,
    },
    {
      id: 4,
      login: "steve",
      first_name: "Steve",
      second_name: "Jobs",
      display_name: "Steve Jobs",
      avatar: avatar1 as string,
      phone: "+81 3 1234 5678",
      email: "steve@example.com",
      password: DEMO_PASSWORD,
    },
    {
      id: 5,
      login: "linus",
      first_name: "Linus",
      second_name: "Torvalds",
      display_name: "Linus Torvalds",
      avatar: avatar2 as string,
      phone: "+49 30 1234 5678",
      email: "linus@example.com",
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
    version: 6,
    users: [demoUser, ...bots],
    sessionUserId: null,
    chats: [
      {
        id: 101,
        title: "Bill Gates",
        avatar: avatar3 as string,
        created_by: 1,
        unread_count: 1,
        last_message: {
          user: lastMessageUser(bots[0]),
          time: at(1995, 8, 24, 16, 20),
          content: "Most of them. And yes, we licensed Start Me Up.",
        },
      },
      {
        id: 102,
        title: "Melinda French",
        avatar: avatar4 as string,
        created_by: 1,
        unread_count: 0,
        last_message: {
          user: lastMessageUser(bots[1]),
          time: at(1993, 3, 22, 16, 12),
          content: "A single-speed CD-ROM is enough.",
        },
      },
      {
        id: 103,
        title: "Steve Jobs",
        avatar: avatar1 as string,
        created_by: 1,
        unread_count: 0,
        last_message: {
          user: lastMessageUser(bots[2]),
          time: at(1997, 9, 16, 17, 5),
          content: "Four products. Consumer, pro, desktop, portable.",
        },
      },
      {
        id: 104,
        title: "Linus Torvalds",
        avatar: avatar2 as string,
        created_by: 1,
        unread_count: 2,
        last_message: {
          user: lastMessageUser(bots[3]),
          time: at(1991, 8, 25, 18, 40),
          content:
            "It won't be big and professional like GNU. The ftp folder is called Linux.",
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
          time: at(1995, 8, 24, 15, 5),
          content: "Chicago shipped this morning. The box says Windows 95.",
          is_read: true,
          file: null,
        },
        {
          id: 2,
          user_id: 2,
          chat_id: 101,
          type: "message",
          time: at(1995, 8, 24, 15, 18),
          content:
            "Press Start. Programs, settings, everything hangs off that button.",
          is_read: true,
          file: null,
        },
        {
          id: 3,
          user_id: 1,
          chat_id: 101,
          type: "message",
          time: at(1995, 8, 24, 15, 42),
          content: "Will my old 3.1 apps still open?",
          is_read: true,
          file: null,
        },
        {
          id: 4,
          user_id: 2,
          chat_id: 101,
          type: "message",
          time: at(1995, 8, 24, 16, 20),
          content: "Most of them. And yes, we licensed Start Me Up.",
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
          time: at(1993, 3, 22, 15, 10),
          content: "Encarta is on a single CD. The whole encyclopedia.",
          is_read: true,
          file: null,
        },
        {
          id: 6,
          user_id: 1,
          chat_id: 102,
          type: "message",
          time: at(1993, 3, 22, 15, 40),
          content: "Does the office need a new drive for it?",
          is_read: true,
          file: null,
        },
        {
          id: 7,
          user_id: 3,
          chat_id: 102,
          type: "message",
          time: at(1993, 3, 22, 16, 12),
          content: "A single-speed CD-ROM is enough.",
          is_read: true,
          file: null,
        },
      ],
      103: [
        {
          id: 8,
          user_id: 4,
          chat_id: 103,
          type: "message",
          time: at(1997, 9, 16, 16, 2),
          content: "The board made me interim CEO this morning.",
          is_read: true,
          file: null,
        },
        {
          id: 9,
          user_id: 1,
          chat_id: 103,
          type: "message",
          time: at(1997, 9, 16, 16, 30),
          content: "What are you going to cut?",
          is_read: true,
          file: null,
        },
        {
          id: 10,
          user_id: 4,
          chat_id: 103,
          type: "message",
          time: at(1997, 9, 16, 17, 5),
          content: "Four products. Consumer, pro, desktop, portable.",
          is_read: true,
          file: null,
        },
      ],
      104: [
        {
          id: 11,
          user_id: 5,
          chat_id: 104,
          type: "message",
          time: at(1991, 8, 25, 18, 12),
          content: "I'm writing a free OS for 386s. Just a hobby.",
          is_read: false,
          file: null,
        },
        {
          id: 12,
          user_id: 5,
          chat_id: 104,
          type: "message",
          time: at(1991, 8, 25, 18, 40),
          content:
            "It won't be big and professional like GNU. The ftp folder is called Linux.",
          is_read: false,
          file: null,
        },
      ],
    },
    tokens: {},
    nextIds: {
      user: 6,
      chat: 105,
      message: 13,
    },
  };
}
