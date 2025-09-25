import EntryForm from "@/components/journal/EntryForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function NewEntryPage() {
  return (
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
  );
}
