import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { JournalEntry } from "@/lib/types";

export default function EntryCard({ entry }: { entry: JournalEntry }) {
  const formattedDate = format(new Date(entry.createdAt), "MMMM d, yyyy");

  return (
    <Link
      href={`/entries/${entry.id}`}
      className="block rounded-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-col transition-shadow duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">{entry.title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-2 text-muted-foreground">{entry.content}</p>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">{entry.tone}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
