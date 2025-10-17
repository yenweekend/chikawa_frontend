import { MainLayout } from "@/user/layouts/main-layout";
import { PageHeader } from "@/user/components/ui/page-header";

export const ProductDetail = () => {
  return (
    <MainLayout className="mx-auto max-w-6xl w-[80%]">
      <PageHeader
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "全商品", href: "/" },
          { label: "ちいかわ カレンダー2026" },
        ]}
      />
    </MainLayout>
  );
};
