import { X } from "lucide-react";
import { type Filter } from "@/user/types/common";

interface AppliedFiltersSectionProps {
  filters: Filter[];
  onRemoveFilter: (key: string) => void;
}

export const AppliedFiltersSection = ({
  filters,
  onRemoveFilter,
}: AppliedFiltersSectionProps) => {
  // console.log(filters);

  return (
    <div className="border-b-border flex flex-col gap-2.5 border-b  px-5 py-4">
      <p className="text-foreground text-base font-medium uppercase">
        Filter:{" "}
      </p>
      <div className="flex flex-wrap items-center gap-2 ">
        {filters.map(
          (filter) =>
            filter.value.length > 0 && (
              <div
                key={filter.key}
                className="flex px-5 py-2 items-center gap-1 rounded-[42px] bg-[#ECE2FF]  text-violet-600"
              >
                <p className="text-sm leading-5 font-medium line-clamp-2">
                  {filter.label}：<span>{filter.value.join(", ")}</span>
                </p>
                <button onClick={() => onRemoveFilter(filter.key)}>
                  <X className="size-4 cursor-pointer stroke-[3px]" />
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};
