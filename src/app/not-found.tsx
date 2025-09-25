import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-3xl font-bold font-headline">Not Found</h2>
      <p className="text-muted-foreground">
        Could not find the requested page or journal entry.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
