import type { JournalEntry } from "./types";

// In a real application, this would be a database like Firestore.
// For this example, we're using an in-memory array.
let entries: JournalEntry[] = [
  {
    id: "1",
    title: "A Walk in the Park",
    content:
      "Today was a beautiful day. I took a long walk in the park and felt the sun on my face. The birds were singing, and for a moment, all my worries melted away. It was a simple, yet profound experience of peace.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    tone: "Joyful",
    toneReason:
      "The entry expresses feelings of peace, beauty, and happiness derived from a simple walk in nature, using phrases like 'beautiful day' and 'worries melted away'.",
  },
  {
    id: "2",
    title: "A Frustrating Day at Work",
    content:
      "Work was incredibly frustrating today. A project I have been working on for weeks hit a major roadblock. I feel like I am back to square one. It is hard to stay motivated when things like this happen.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    tone: "Frustrated",
    toneReason:
      'The author explicitly states feeling "incredibly frustrating" and demotivated due to a setback at work.',
  },
  {
    id: "3",
    title: "Reflections on an Old Friendship",
    content:
      "I was looking through old photos and came across pictures of me and an old friend. It brought back a wave of nostalgia and a bit of sadness. We have grown so far apart. I wonder if we could ever reconnect.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    tone: "Nostalgic",
    toneReason:
      'The text mentions looking at old photos, which brought back "a wave of nostalgia and a bit of sadness" about a past friendship.',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getEntries(query?: string): Promise<JournalEntry[]> {
  await delay(500);
  let filteredEntries = entries;

  if (query) {
    const lowercasedQuery = query.toLowerCase();
    filteredEntries = entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(lowercasedQuery) ||
        entry.content.toLowerCase().includes(lowercasedQuery) ||
        entry.tone.toLowerCase().includes(lowercasedQuery)
    );
  }

  // return entries sorted by date
  return [...filteredEntries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getEntry(id: string): Promise<JournalEntry | undefined> {
  await delay(300);
  return entries.find((entry) => entry.id === id);
}

export async function saveEntry(
  entry: Omit<JournalEntry, "id" | "createdAt">
): Promise<JournalEntry> {
  await delay(1000);
  const newEntry: JournalEntry = {
    ...entry,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  entries = [newEntry, ...entries];
  return newEntry;
}
