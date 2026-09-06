import { cn } from "@/lib/utils";

export function StitchDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center text-secondary", className)}
      aria-hidden="true"
    >
      <svg width="120" height="13" viewBox="0 0 120 13" fill="none">
        <line
          x1="0"
          y1="6.5"
          x2="46"
          y2="6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="60" cy="6.5" r="3" fill="currentColor" opacity="0.75" />
        <line
          x1="74"
          y1="6.5"
          x2="120"
          y2="6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
