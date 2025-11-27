import { MainLayout } from "@/user/layouts/main-layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductSection } from "@/user/features/products/product-section";
import { BannerSlider } from "@/user/components/ui/banner-slider";
import { PRODUCTS_DATA } from "@/user/constants/fakeData";

export default function HomePage() {
  return (
    <MainLayout>
      <BannerSlider />
      <ProductSection
        title="New Items"
        description="Sale off 50%"
        products={PRODUCTS_DATA}
        viewPath="/"
      />
    </MainLayout>
  );
}
