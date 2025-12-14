import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/form-utils";

import { Badge } from "@/components/ui/badge";

const statusBadgeVariants = cva(
  "rounded-full px-2.5 py-[3px] text-sm font-bold",
  {
    variants: {
      variant: {
        yellow: "bg-yellow-200 text-yellow-700",
        blue: "bg-blue-200 text-blue-700",
        green: "bg-green-200 text-green-700",
        red: "bg-red-50 text-destructive",
        purple: "bg-violet-25 text-violet-600",
        default: "bg-slate-200 text-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge = ({
  variant,
  children,
  className,
}: StatusBadgeProps) => {
  return (
    <Badge className={cn(statusBadgeVariants({ variant }), className)}>
      {children}
    </Badge>
  );
};

export const OptionalBadge = ({
  text = "Optional",
  className,
}: {
  text: string;
  className?: string;
}) => (
  <Badge
    className={cn(
      "bg-secondary text-secondary-foreground rounded-full px-2.5 py-[2px]",
      className
    )}
  >
    {text}
  </Badge>
);

export const RequiredBadge = () => (
  <Badge className="text-destructive rounded-full bg-red-50 px-2.5 py-[2px]">
    Required
  </Badge>
);
