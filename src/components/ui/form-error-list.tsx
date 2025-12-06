"use client";

import { cn } from "@/lib/utils/form-utils";

interface FormErrorListProps {
  errors: string[];
  className?: string;
  errorClassName?: string;
}

export const FormErrorList = ({
  errors,
  className,
  errorClassName,
}: FormErrorListProps) => {
  if (errors.length === 0) return null;

  return (
    <div className={cn("space-y-1", className)}>
      {errors.map((error, index) => (
        <p
          key={index}
          className={cn("text-destructive text-sm", errorClassName)}
        >
          {error}
        </p>
      ))}
    </div>
  );
};
