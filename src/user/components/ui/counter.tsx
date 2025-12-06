"use client";

import { Minus, Plus } from "lucide-react";

import { isValidNumber } from "@/lib/utils/number";
import { cn } from "@/lib/utils/form-utils";

import { Button } from "@/components/ui/button";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
  disableIncrement?: boolean;
}

export const Counter = ({
  value,
  onChange,
  min = 1,
  max,
  label = "名",
  className,
  disableIncrement = false,
}: CounterProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!isValidNumber(max) || value < max) {
      onChange(value + 1);
    }
  };

  const isDecrementDisabled = value <= min;
  const isIncrementDisabled =
    (isValidNumber(max) && value >= max) || disableIncrement;

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "size-8 border transition-colors",
          isDecrementDisabled
            ? "border-slate-200 text-slate-200"
            : "border-gray-300 !text-black"
        )}
        disabled={isDecrementDisabled}
        onClick={handleDecrement}
        aria-label="数量を減らす"
      >
        <Minus className="size-3.5" />
      </Button>
      <div className="text-foreground leading-7 font-bold">
        {value}
        {label}
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "size-8 border transition-colors",
          isIncrementDisabled
            ? "border-slate-200 text-slate-200"
            : "border-gray-300 !text-black"
        )}
        disabled={isIncrementDisabled}
        onClick={handleIncrement}
        aria-label="数量を増やす"
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
};
