import { useParams } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { MainLayout } from "@/user/layouts/main-layout";
import { Typography } from "@/components/ui/typography";
import { BlogSection } from "@/user/features/blogs/blog-section";
import { FooterPagination } from "@/components/ui/footer-pagination";

export const BlogPage = () => {
  const { slug } = useParams();

  console.log(slug);

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
        <FooterPagination pageTotals={20} />
      </Card>
    </MainLayout>
  );
};
