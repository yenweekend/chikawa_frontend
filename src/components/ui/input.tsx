import React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "bg-background border-input flex h-9 w-full min-w-0 rounded-lg border px-3 py-2 text-base",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "transition-[color,box-shadow,border-color] outline-none",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

          error
            ? "shadow-focus-ring-error bg-red-100"
            : "focus-visible:shadow-focus-ring",

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
