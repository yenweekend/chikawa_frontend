"use client";

import * as React from "react";

import { cn } from "@/lib/utils/form-utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

const modalVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[250px] h-[250px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
  {
    variants: {
      size: {},
    },
    defaultVariants: {},
  }
);

const spinnerVariants = cva("relative inline-block", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-32 w-32",
      xl: "h-24 w-24",
      "2xl": "h-32 w-32",
      "3xl": "h-40 w-40",
    },
    variant: {
      default: "",
      purple: "",
      blue: "",
      green: "",
    },
  },
  defaultVariants: {
    size: "xl",
    variant: "purple",
  },
});

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  strokeWidth?: number;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, strokeWidth = 6, ...props }, ref) => {
    const getColors = () => {
      const primaryColor = "var(--primary)";

      switch (variant) {
        case "purple":
          return { track: "#EDE9FE", indicator: primaryColor };
        case "blue":
          return { track: "#DBEAFE", indicator: "#2563EB" };
        case "green":
          return { track: "#DCFCE7", indicator: "#16A34A" };
        default:
          return { track: "#E5E7EB", indicator: primaryColor };
      }
    };

    const colors = getColors();

    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        {...props}
      >
        <svg
          className="animate-spin"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={colors.track}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M50 8 A 42 42 0 0 1 88 30"
            stroke={colors.indicator}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

interface LoadingModalProps extends VariantProps<typeof modalVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  spinnerSize?: VariantProps<typeof spinnerVariants>["size"];
  spinnerVariant?: VariantProps<typeof spinnerVariants>["variant"];
  strokeWidth?: number;
  className?: string;
  titlePosition?: "top" | "bottom";
}

const LoadingModal = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  LoadingModalProps
>(
  (
    {
      open,
      onOpenChange,
      title = "決済処理中...",
      description,
      size,
      spinnerSize = "xl",
      spinnerVariant = "purple",
      strokeWidth = 12,
      className,
      titlePosition = "bottom",
      ...props
    },
    ref
  ) => {
    const renderTextContent = () => (
      <div className="space-y-2">
        <DialogPrimitive.Title className="text-foreground text-lg font-bold">
          {title}
        </DialogPrimitive.Title>
        {description && (
          <DialogPrimitive.Description className="text-sm text-gray-600">
            {description}
          </DialogPrimitive.Description>
        )}
      </div>
    );

    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/70" />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(modalVariants({ size }), className)}
            {...props}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              {titlePosition === "top" && renderTextContent()}

              <LoadingSpinner
                size={spinnerSize}
                variant={spinnerVariant}
                strokeWidth={strokeWidth}
              />

              {titlePosition === "bottom" && renderTextContent()}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);
LoadingModal.displayName = "LoadingModal";

export { LoadingModal, LoadingSpinner, modalVariants, spinnerVariants };

export type { LoadingModalProps, LoadingSpinnerProps };
