import type { JournalEntry } from "@/lib/types";
import EntryCard from "./EntryCard";

export default function EntryList({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="grid gap-6">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
