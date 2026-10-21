const REPLIES = [
  "Sounds good.",
  "I'll get back to you.",
  "Ha! Classic.",
  "Working on Windows 3.1 vibes?",
  "Copy that.",
  "Interesting point.",
  "One moment…",
  "Agreed.",
  "🙂",
  "Roger that.",
];

export function pickBotReply(userMessage: string): string {
  const normalized = userMessage.trim().toLowerCase();

  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Hello! How can I help?";
  }
  if (normalized.includes("?")) {
    return "Good question — let me think about it.";
  }

  const index =
    Math.abs(
      Array.from(userMessage).reduce((sum, char) => sum + char.charCodeAt(0), 0)
    ) % REPLIES.length;

  return REPLIES[index];
}

export function botReplyDelayMs(): number {
  return 600 + Math.floor(Math.random() * 900);
}
