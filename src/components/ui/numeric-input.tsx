"use client";

import { type ChangeEvent } from "react";

import { numberInputSanitize } from "@/lib/utils/form-utils";
import { FormInputField } from "@/components/ui/form-input";
import { type InputProps } from "@/components/ui/input";

interface NumericInputProps {
  label?: string;
  required?: boolean;
  maxLength?: number;
  showRequiredIcon?: boolean;
  labelClassName?: string;
  badge?: React.ReactNode;
  onChange?: (value: string) => void;
  inputProps?: Omit<InputProps, "type" | "onChange" | "inputMode" | "pattern">;
  showFormMessage?: boolean;
}

export const NumericInput = ({
  label,
  required,
  maxLength,
  showRequiredIcon,
  labelClassName,
  badge,
  onChange,
  inputProps,
  showFormMessage,
}: NumericInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = numberInputSanitize(inputValue);

    const finalValue = maxLength
      ? numericValue.slice(0, maxLength)
      : numericValue;

    onChange?.(finalValue);
  };

  return (
    <FormInputField
      label={label}
      type="tel"
      required={required}
      showRequiredIcon={showRequiredIcon}
      labelClassName={labelClassName}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength,
        ...inputProps,
        onChange: handleChange,
      }}
      badge={badge}
      showFormMessage={showFormMessage}
    />
  );
};
