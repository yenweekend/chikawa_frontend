import { useNavigate, useSearchParams } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { MainLayout } from "@/user/layouts/main-layout";
import { Typography } from "@/components/ui/typography";
import { BlogSection } from "@/user/features/blogs/blog-section";
import { Pagination } from "@/components/ui/pagination";
import { useCallback } from "react";

export const BlogPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);

  const handlePageChange = useCallback(
    (page: number) => {
      const current = new URLSearchParams(searchParams.toString());
      current.set("page", page.toString());
      navigate(`?${current.toString()}`);
    },
    [navigate, searchParams]
  );

  return (
    <MainLayout>
      <Card className="max-w-6xl mx-auto my-20 flex items-center justify-center gap-10">
        <Typography
          variant="h3"
          className="font-normal text-3xl text-center my-10 tracking-wide "
        >
          Notice from Chiikawa Market
        </Typography>
        <BlogSection
          title="Thank you very much for your continued patronage of the market more than plain.Chiikawa We would like to inform you t..."
          description="Thank you very much for your continued patronage of the market more than plain.Chiikawa We would like to inform you t..."
          created_at="October 17, 2025s"
        />
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={20}
        />
      </Card>
    </MainLayout>
  );
};
