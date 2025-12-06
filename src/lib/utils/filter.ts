import type { SelectOption } from "@/user/types/api";

export function parseArrayParam(value: string | null): string[] {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function createArrayParamParser(searchParams: URLSearchParams) {
  return (key: string): string[] => {
    const value = searchParams.get(key);
    return parseArrayParam(value);
  };
}

export const getFilterLabel = (
  labelMaps: SelectOption[],
  value: string
): string => {
  const found = labelMaps.find((opt) => opt.value === value);

  return found?.label ?? value;
};

export function createFilterResetHandler<T>(
  emptyFilters: T,
  setLocalFilters: (filters: T) => void,
  setIsDirty: (open: boolean) => void,
  resetFilters: () => void
) {
  return () => {
    setLocalFilters(emptyFilters);
    setIsDirty(false);
    resetFilters();
  };
}

export function createFilterSubmitHandler<T>(
  localFilters: T,
  setAppliedFilters: (filters: T) => void,
  applyFilters: (filters: T) => void,
  setIsDirty: (open: boolean) => void
) {
  // console.log(localFilters);

  return () => {
    setAppliedFilters(localFilters);
    applyFilters(localFilters);
    setIsDirty(false);
  };
}
