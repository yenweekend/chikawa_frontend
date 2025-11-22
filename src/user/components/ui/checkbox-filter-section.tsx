import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";

interface SelectOption {
  value: string;
  label: string;
}

interface CheckboxFilterSectionProps {
  title: string;
  fieldName: string;
  options: SelectOption[];
  value: string;
  selectedValues: string[];
  hiddenAllCheckbox?: boolean;
  onChange: (fieldName: string, values: string[]) => void;
}

export const CheckboxFilterSection = ({
  title,
  fieldName,
  options,
  value,
  selectedValues,
  hiddenAllCheckbox = false,
  onChange,
}: CheckboxFilterSectionProps) => {
  const allValues = options.map((c) => String(c.value));
  const isAllSelected =
    allValues.length > 0 && allValues.every((v) => selectedValues.includes(v));

  const handleSelectAll = (checked: boolean) => {
    onChange(fieldName, checked ? allValues : []);
  };

  const handleSelectOption = (optionValue: string, checked: boolean) => {
    onChange(
      fieldName,
      checked
        ? [...selectedValues, optionValue]
        : selectedValues.filter((v) => v !== optionValue)
    );
  };

  return (
    <AccordionItem
      value={value}
      className="border-b-border border-b last:border-b"
    >
      <AccordionTrigger className="border-b-border cursor-pointer border-b px-5 py-4 hover:no-underline focus-visible:border-none">
        <Typography variant="table-head">{title}</Typography>
      </AccordionTrigger>
      <AccordionContent className="flex flex-wrap gap-2.5 px-5 pt-4 pb-8">
        {options.length > 0 && !hiddenAllCheckbox && (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={(checked) => handleSelectAll(checked === true)}
              className="m-0 size-5"
            />
            <label className="text-foreground text-base font-medium">All</label>
          </div>
        )}

        {options.map(({ value, label }) => (
          <div key={value} className="flex items-center gap-2">
            <Checkbox
              checked={selectedValues.includes(value)}
              onCheckedChange={(checked) =>
                handleSelectOption(value, checked === true)
              }
              className="m-0 size-5"
            />
            <label className="text-foreground text-base font-medium">
              {label}
            </label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
