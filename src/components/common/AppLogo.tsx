import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  const logo = PlaceHolderImages.find((img) => img.id === "earthen-echoes-logo");

  if (!logo) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={logo.imageUrl}
        alt={logo.description}
        fill
        className="object-cover rounded-md"
        data-ai-hint={logo.imageHint}
      />
    </div>
  );
}
