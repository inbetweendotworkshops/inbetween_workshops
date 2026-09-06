import { Button } from "@/components/ui/button";
import { buildBookingLink } from "@/lib/booking";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BookButton({
  settings,
  context,
  label,
  variant = "default",
  className,
}: {
  settings: SiteSettings;
  context?: string;
  label?: string;
  variant?: "default" | "outline";
  className?: string;
}) {
  const href = buildBookingLink(settings, context);
  return (
    <Button
      size="lg"
      variant={variant}
      nativeButton={false}
      className={cn("h-auto rounded-full px-5 py-2.5", className)}
      render={
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label ?? "Book a seat"}
        </a>
      }
    />
  );
}
