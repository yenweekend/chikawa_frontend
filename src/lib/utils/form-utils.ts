import { clsx, type ClassValue } from "clsx";
import type { FieldError, FieldErrors, Path } from "react-hook-form";
import { get } from "lodash";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number | undefined): string => {
  return (price || 0).toLocaleString("ja-JP");
};

export const getConsolidatedErrors = <T extends Record<string, unknown>>(
  errors: FieldErrors<T>,
  fieldPaths: Path<T>[],
  fieldLabels?: Partial<Record<Path<T>, string>>
): string[] => {
  return fieldPaths.reduce<string[]>((acc, fieldPath) => {
    const fieldError = get(errors, fieldPath);

    if (isFieldError(fieldError) && fieldError.message) {
      if (!fieldLabels) {
        acc.push(fieldError.message);
      } else {
        const fieldLabel = fieldLabels?.[fieldPath] || fieldPath;
        acc.push(`${fieldLabel}: ${fieldError.message}`);
      }
    }

    return acc;
  }, []);
};
const isFieldError = (value: unknown): value is FieldError => {
  return (
    value !== null &&
    typeof value === "object" &&
    "message" in value &&
    typeof (value as Record<string, unknown>).message === "string"
  );
};
