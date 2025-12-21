"use client";

import React from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils/form-utils";
import { useDebounceSearch } from "@/hooks/use-debounced-search";

import { Input } from "@/components/ui/input";

interface FormSearchInputProps {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  inputProps?: React.ComponentProps<"input">;
  onDebouncedSearch?: (value: string) => void;
  onClick?: (value: string) => void;
  debounceDelay?: number;
}

const FormSearchField = React.forwardRef<
  HTMLInputElement,
  FormSearchInputProps
>(
  (
    {
      className,
      inputClassName,
      iconClassName,
      inputProps,
      onDebouncedSearch,
      onClick,
      debounceDelay = 500,
    },
    ref
  ) => {
    const { searchValue, handleInputChange } = useDebounceSearch({
      onSearch: onDebouncedSearch || (() => {}),
      delay: debounceDelay,
    });

    const onChange = onDebouncedSearch
      ? handleInputChange
      : inputProps?.onChange;
    const value = onDebouncedSearch ? searchValue : inputProps?.value;

    const triggerSearch = () => {
      const keyword = String(value).trim();
      if (!keyword) return;

      onClick?.(keyword);
    };

    return (
      <div className={cn("relative", className)}>
        <Input
          ref={ref}
          {...inputProps}
          value={value}
          onChange={onChange}
          className={cn(
            "h-11 rounded-xl border-slate-300 py-4 pr-4 pl-10 text-sm placeholder:text-sm placeholder:leading-5",
            inputClassName
          )}
          onKeyDown={(e) => {
            inputProps?.onKeyDown?.(e);

            if (e.key === "Enter") {
              e.preventDefault();
              triggerSearch();
            }
          }}
          aria-label="検索"
        />
        <div
          className={cn("absolute top-1/2  -translate-y-1/2", iconClassName)}
          onClick={() => onClick?.(String(value))}
        >
          <SearchIcon className="text-foreground size-5" />
        </div>
      </div>
    );
  }
);

FormSearchField.displayName = "FormSearchField";

export { FormSearchField };
