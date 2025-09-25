import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import EntryList from "@/components/journal/EntryList";
import Search from "@/components/journal/Search";
import { getEntries } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const dynamic = 'force-dynamic';

export default function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const emptyStateImage = PlaceHolderImages.find(img => img.id === 'empty-journal');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Search placeholder="Search entries by keyword or tone..." />
        </div>
        <Button asChild className="shrink-0">
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Link>
        </Button>
      </div>
      <Suspense key={query} fallback={<EntryListSkeleton />}>
        <Entries query={query} emptyStateImage={emptyStateImage}/>
      </Suspense>
    </div>
  );
}

async function Entries({ query, emptyStateImage }: { query: string, emptyStateImage: any }) {
  const entries = await getEntries(query);

  if (entries.length === 0 && query) {
     return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-2xl font-headline font-medium">No Results Found</h2>
        <p className="mt-2 text-muted-foreground">
          Try a different search term.
        </p>
         <Button asChild variant="outline" className="mt-6">
          <Link href="/">Clear Search</Link>
        </Button>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-card/50 p-8 text-center">
        {emptyStateImage && (
          <Image
            src={emptyStateImage.imageUrl}
            alt={emptyStateImage.description}
            width={400}
            height={300}
            className="mb-4 rounded-lg object-cover"
            data-ai-hint={emptyStateImage.imageHint}
          />
        )}
        <h2 className="text-2xl font-headline font-medium">
          Your Journal is Empty
        </h2>
        <p className="mt-2 text-muted-foreground">
          Ready to capture a thought?
        </p>
        <Button asChild className="mt-6">
          <Link href="/new">Create Your First Entry</Link>
        </Button>
      </div>
    );
  }

  return <EntryList entries={entries} />;
}

function EntryListSkeleton() {
  return (
    <div className="grid gap-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
