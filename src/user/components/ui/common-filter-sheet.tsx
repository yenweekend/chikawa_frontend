"use client";

import { useCallback, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { AppliedFiltersSection } from "@/user/components/ui/applied-filters-section";

export interface Filter {
  key: string;
  label: string;
  value: string[];
}

export interface FilterSectionConfig {
  key: string;
  title: string;
  fieldName: string;
  options?: Array<{ value: string; label: string }>;
  value: string;
  hiddenAllCheckbox?: boolean;
  type?: "checkbox" | "options" | "price";
}

export interface CommonFilterSheetProps {
  filterSections: FilterSectionConfig[];
  filters: Filter[];
  onRemoveFilter: (key: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  isDirty: boolean;
  title?: string;
  children?: ReactNode;
}

export const CommonFilterSheet = ({
  filterSections,
  filters,
  onRemoveFilter,
  onSubmit,
  onReset,
  isDirty,
  children,
}: CommonFilterSheetProps) => {
  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const handleReset = useCallback(() => {
    onReset();
  }, [onReset]);

  return (
    <>
      <AppliedFiltersSection
        filters={filters}
        onRemoveFilter={onRemoveFilter as (key: string) => void}
      />

      <div className="flex flex-auto flex-col">
        <div className="relative flex-auto flex-col overflow-hidden">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={filterSections.map((item) => item.value)}
          >
            {children}
          </Accordion>
        </div>

        <div className="mt-auto flex items-center gap-2 px-5 py-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full basis-1/2 "
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="default"
            className="h-11 rounded-full basis-1/2"
            onClick={handleSubmit}
            disabled={!isDirty}
          >
            Filter
          </Button>
        </div>
      </div>
    </>
  );
};
