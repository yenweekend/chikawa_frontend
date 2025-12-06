"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useMemo } from "react";

import { cn } from "@/lib/utils/form-utils";

import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
}: PaginationProps) => {
  const visiblePages = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("ellipsis");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("ellipsis");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | "ellipsis") => {
    if (page === "ellipsis") return;

    onPageChange(page);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="size-10 rounded-xl"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {visiblePages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <Button
              key={`ellipsis-${index}`}
              type="button"
              variant="ghost"
              size="icon"
              disabled
              className="size-10 rounded-xl"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          );
        }

        return (
          <Button
            key={page}
            type="button"
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageClick(page)}
            className="size-10 rounded-xl"
          >
            {page}
          </Button>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="size-10 rounded-xl"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
