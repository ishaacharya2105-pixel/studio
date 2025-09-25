import Link from "next/link";
import { AppLogo } from "@/components/common/AppLogo";

export default function Header() {
  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <AppLogo className="h-8 w-8 text-primary" />
          <span className="font-headline">Earthen Echoes</span>
        </Link>
      </div>
    </header>
  );
}
