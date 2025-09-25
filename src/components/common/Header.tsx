import Link from "next/link";
import { BookMarked } from "lucide-react";

export default function Header() {
  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <BookMarked className="h-6 w-6 text-primary" />
          <span className="font-headline">Earthen Echoes</span>
        </Link>
      </div>
    </header>
  );
}
