import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Typography } from '@/components/ui/typography';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SelectOption {
  value: string;
  label: string;
}

interface OptionFilterSectionProps {
  value: string;
  title: string;
  options: SelectOption[];
  selectedValue?: string;
  onChange: (value: string | undefined) => void;
}

export const OptionFilterSection = ({
  value,
  title,
  options,
  selectedValue,
  onChange,
}: OptionFilterSectionProps) => {
  const handleChange = (newValue: string) => {
    onChange(newValue === 'all' ? undefined : newValue);
  };

  return (
    <AccordionItem
      value={value}
      className="border-b-border border-b last:border-b"
    >
      <AccordionTrigger className="border-b-border cursor-pointer border-b px-5 py-4 hover:no-underline focus-visible:border-none">
        <Typography variant="table-head">{title}</Typography>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 px-5 pt-4 pb-8">
        <RadioGroup
          value={selectedValue || 'all'}
          onValueChange={handleChange}
          className="space-y-4"
        >
          {options.map(({ value: optionValue, label }) => (
            <div key={optionValue} className="flex items-center space-x-2">
              <RadioGroupItem
                value={optionValue}
                id={`${value}-${optionValue}`}
                className="h-5 w-5"
                iconClassName="size-3"
              />
              <Label
                htmlFor={`${value}-${optionValue}`}
                className="cursor-pointer text-base font-medium"
              >
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
