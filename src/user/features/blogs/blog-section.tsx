import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import { Typography } from "@/components/ui/typography";

interface BlogSectionProps {
  title: string;
  created_at: string;
  description: string;
  href?: string;
  contentClassName?: string;
}

export const BlogSection = ({
  title,
  created_at,
  description,
  href = "/",
  contentClassName,
}: BlogSectionProps) => {
  return (
    <div className=" w-full px-8">
      <div
        className={cn(
          " border-b border-dashed space-y-2 py-8",
          contentClassName
        )}
      >
        <Typography variant="large" className="truncate text-xl font-bold">
          {title}
        </Typography>
        <Typography variant="muted" className="uppercase text-base">
          {created_at}
        </Typography>
        <Typography variant="muted" className="line-clamp-2">
          {description}
        </Typography>
        <Link to={href} className="underline text-foreground hover:opacity-65">
          Read more
        </Link>
      </div>
    </div>
  );
};
