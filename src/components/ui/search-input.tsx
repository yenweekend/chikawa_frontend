'use client';

import React from 'react';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/lib/utils/form-utils';
import { useDebounceSearch } from '@/hooks/use-debounced-search';

import { Input } from '@/components/ui/input';

interface FormSearchInputProps {
  className?: string;
  inputClassName?: string;
  inputProps?: React.ComponentProps<'input'>;
  onDebouncedSearch?: (value: string) => void;
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
      inputProps,
      onDebouncedSearch,
      debounceDelay = 500,
    },
    ref,
  ) => {
    const { searchValue, handleInputChange } = useDebounceSearch({
      onSearch: onDebouncedSearch || (() => {}),
      delay: debounceDelay,
    });

    const onChange = onDebouncedSearch
      ? handleInputChange
      : inputProps?.onChange;
    const value = onDebouncedSearch ? searchValue : inputProps?.value;

    return (
      <div className={cn('relative', className)}>
        <Input
          ref={ref}
          {...inputProps}
          value={value}
          onChange={onChange}
          className={cn(
            'h-11 rounded-xl border-slate-300 py-4 pr-4 pl-10 text-sm placeholder:text-sm placeholder:leading-5',
            inputClassName,
          )}
          aria-label="検索"
        />
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <SearchIcon className="text-foreground size-5" />
        </div>
      </div>
    );
  },
);

FormSearchField.displayName = 'FormSearchField';

export { FormSearchField };
