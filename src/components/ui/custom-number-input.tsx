"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Typography } from "@/components/ui/typography";

interface CustomNumberInputProps {
  label?: string;
  description?: string;
  required?: boolean;
  showRequiredIcon?: boolean;
  showFormMessage?: boolean;
  badge?: React.ReactNode;
  prefix?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value?: number | string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputProps?: Omit<
    InputProps,
    "type" | "value" | "onChange" | "min" | "max" | "step"
  > & {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  labelClassName?: string;
  unit?: string;
}

export const CustomNumberInput = ({
  label,
  description,
  required = false,
  showRequiredIcon = false,
  showFormMessage = true,
  badge,
  prefix,
  min = 0,
  max,
  step = 1,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  inputProps,
  labelClassName,
  unit,
}: CustomNumberInputProps) => {
  const currentValue = inputProps?.value ?? value ?? "";
  const isDisabled = inputProps?.disabled ?? disabled;
  const currentPlaceholder = inputProps?.placeholder ?? placeholder;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(e.key) ||
      (e.key === "a" && (e.ctrlKey || e.metaKey)) ||
      (e.key === "c" && (e.ctrlKey || e.metaKey)) ||
      (e.key === "v" && (e.ctrlKey || e.metaKey)) ||
      (e.key === "x" && (e.ctrlKey || e.metaKey))
    ) {
      return;
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value;
    if (onChange) {
      onChange(stringValue);
    } else if (inputProps?.onChange) {
      inputProps.onChange(e);
    }
  };

  const inputElement = (
    <div className="relative flex items-center gap-2">
      {prefix && (
        <div className="text-muted-foreground pointer-events-none absolute left-3 z-10 flex items-center">
          {prefix}
        </div>
      )}
      <Input
        type="number"
        {...inputProps}
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClick={handleClick}
        placeholder={currentPlaceholder}
        disabled={isDisabled}
        className={cn(prefix && "pl-10", inputProps?.className)}
      />
      {unit && <Typography className="text-foreground">{unit}</Typography>}
    </div>
  );

  return (
    <FormItem className={className}>
      {label && (
        <FormLabel
          className={cn("text-sm leading-3.5 font-medium", labelClassName)}
        >
          {label}
          {showRequiredIcon && required && "Required"}
          {badge}
        </FormLabel>
      )}
      <FormControl>{inputElement}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {showFormMessage && <FormMessage />}
    </FormItem>
  );
};
