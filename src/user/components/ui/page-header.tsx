import { Link } from "react-router-dom";

import { cn } from "@/lib/utils/form-utils";

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
            <BreadcrumbList className="font-medium uppercase !text-primary text-base">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          to={item.href}
                          className=" hover:opacity-65  border-b border-none !text-primary no-underline"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-medium text-primary  ">
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
