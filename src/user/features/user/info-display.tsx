import { cn } from "@/lib/utils/form-utils";

interface InfoDisplayProps {
  title?: string;
  value: string;
  className?: string;
  textClassName?: string;
}

export const InfoDisplay = ({
  title,
  value,
  className,
  textClassName,
}: InfoDisplayProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <p className={cn("text-[15px]", textClassName)}>
        {title && `${title} : `}
        {value}
      </p>
    </div>
  );
};
