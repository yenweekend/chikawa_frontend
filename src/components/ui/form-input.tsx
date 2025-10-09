"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Input, type InputProps } from "@/components/ui/input";
import {
  PasswordInput,
  type PasswordInputProps,
} from "@/components/ui/password-input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";

export interface FormInputProps {
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  showRequiredIcon?: boolean;
  showFormMessage?: boolean;
  badge?: React.ReactNode;
}

interface TextInputProps extends FormInputProps {
  type?: "text" | "email" | "number" | "tel" | "url" | "search" | "date-picker";
  inputProps?: Omit<InputProps, "type">;
}

interface PasswordFieldProps extends FormInputProps {
  type: "password";
  inputProps?: PasswordInputProps;
}

type FormInputFieldProps = TextInputProps | PasswordFieldProps;

const FormInputField = React.forwardRef<HTMLInputElement, FormInputFieldProps>(
  (
    {
      label,
      description,
      required = false,
      className,
      inputClassName,
      labelClassName,
      type = "text",
      inputProps,
      showRequiredIcon = false,
      showFormMessage = true,
      badge,
    },
    ref
  ) => {
    const { error } = useFormField();

    return (
      <div className="grid gap-2 text-left">
        <FormItem className={className}>
          {label && (
            <FormLabel
              className={cn("text-base leading-3.5 font-", labelClassName)}
            >
              {label}
              {showRequiredIcon && required && (
                <p className="text-base text-destructive">Required</p>
              )}
              {badge}
            </FormLabel>
          )}
          <FormControl>
            {type === "password" ? (
              <PasswordInput
                ref={ref}
                required={required}
                error={!!error}
                className={cn(
                  "h-14 text-base font-medium placeholder:font-normal",
                  inputClassName
                )}
                {...(inputProps as PasswordInputProps)}
              />
            ) : (
              <Input
                type={type}
                ref={ref}
                required={required}
                error={!!error}
                className={cn(
                  "h-14 text-base font-medium placeholder:font-normal",
                  inputClassName
                )}
                {...(inputProps as InputProps)}
              />
            )}
          </FormControl>
        </FormItem>
        {description && <FormDescription>{description}</FormDescription>}
        {showFormMessage && <FormMessage />}
      </div>
    );
  }
);

FormInputField.displayName = "FormInputField";

export { FormInputField };
