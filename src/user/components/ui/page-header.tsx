import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  others?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  breadcrumbs,
  others,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("p-6", className)}>
      <div className="space-y-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList className="font-medium">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          to={item.href}
                          className="!text-violet-500 hover:text-violet-600  border-b border-b-violet-500"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-medium text-violet-500 hover:text-violet-600 ">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        {others}
      </div>
    </div>
  );
};
