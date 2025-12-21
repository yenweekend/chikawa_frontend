import { cn } from "@/lib/utils/form-utils";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Wait for seconds...</p>
      </div>
    </div>
  );
};
