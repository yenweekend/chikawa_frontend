"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ChangeEvent,
} from "react";
import { debounce } from "lodash";

interface UseDebounceSearchProps {
  onSearch: (value: string) => void;
  delay?: number;
}

export const useDebounceSearch = ({
  onSearch,
  delay = 500,
}: UseDebounceSearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchRef = useRef<ReturnType<typeof debounce>>(null);

  useEffect(() => {
    debouncedSearchRef.current = debounce((value: string) => {
      onSearch(value);
    }, delay);

    return () => {
      debouncedSearchRef.current?.cancel?.();
    };
  }, [onSearch, delay]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearchRef.current?.(value);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchValue("");
    debouncedSearchRef.current?.cancel?.();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchRef.current?.cancel?.();
    };
  }, []);

  return {
    searchValue,
    setSearchValue,
    handleInputChange,
    resetSearch,
  };
};
