import { OptionalBadge } from "@/components/ui/form-badge";
import { cn } from "@/lib/utils/form-utils";

interface ProfileSectionProps {
  title: string;
  value: string;
  className?: string;
}

export const ProfileSection = ({
  title,
  value,
  className,
}: ProfileSectionProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <OptionalBadge text={title} className="text-base font-medium" />
      <p className="text-xl">{value}</p>
    </div>
  );
};
