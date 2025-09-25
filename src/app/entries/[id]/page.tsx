import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getEntry } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function EntryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getEntry(params.id);

  if (!entry) {
    notFound();
  }

  const formattedDate = format(new Date(entry.createdAt), "EEEE, MMMM d, yyyy");

  return (
    <div className="space-y-8">
       <Button variant="ghost" asChild className="-ml-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all entries
        </Link>
      </Button>
      <div className="space-y-2 border-b pb-4">
        <h1 className="text-4xl font-bold font-headline">{entry.title}</h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      <article className="max-w-none">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90">
          {entry.content}
        </p>
      </article>

      <Card className="border-accent/50 bg-accent/20">
        <CardHeader className="flex-row items-start gap-4 space-y-0">
          <div className="mt-1 flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-accent-foreground" />
          </div>
          <div className="flex-grow">
            <CardTitle className="font-headline text-lg font-semibold">
              AI Tone Analysis
            </CardTitle>
            <CardDescription className="text-accent-foreground/80">
              Detected Tone:{" "}
              <span className="font-semibold text-accent-foreground">
                {entry.tone}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-accent-foreground/90">
            {entry.toneReason}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
