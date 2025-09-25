import EntryForm from "@/components/journal/EntryForm";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function NewEntryPage() {
  const newEntryImage = PlaceHolderImages.find(img => img.id === 'new-entry-visual');
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            New Journal Entry
          </CardTitle>
          <CardDescription>What's on your mind today?</CardDescription>
        </CardHeader>
        <CardContent>
          <EntryForm />
        </CardContent>
      </Card>
      {newEntryImage && (
         <div className="hidden md:block">
            <Image
              src={newEntryImage.imageUrl}
              alt={newEntryImage.description}
              width={600}
              height={400}
              className="rounded-lg object-cover aspect-[4/3]"
              data-ai-hint={newEntryImage.imageHint}
            />
        </div>
      )}
    </div>
  );
}
