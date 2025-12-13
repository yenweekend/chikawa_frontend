import { MainLayout } from "@/user/layouts/main-layout";

import { useCallback, useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductSection } from "@/user/features/products/product-section";
import { BannerSlider } from "@/user/components/ui/banner-slider";
import { getErrorMessage } from "@/lib/utils/auth";
import { toast } from "sonner";
import { getHomeData } from "@/actions/product";
import type { HomeData } from "@/user/types/products";
import { Loading } from "@/user/components/ui/loading";

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);
  const fetchHomeData = useCallback(async () => {
    setIsPending(true);
    try {
      const response = await getHomeData();

      console.log(response.data);
      if (response.data) {
        setHomeData(response.data.result);
      }
    } catch (err) {
      console.log(err);

      toast.error(getErrorMessage(err));
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  if (isPending) return <Loading />;

  return (
    <MainLayout>
      <BannerSlider />
      <ProductSection
        title={homeData?.bestSellersDTO?.name || ""}
        description={homeData?.bestSellersDTO?.description || ""}
        products={homeData?.bestSellersDTO.products || []}
        viewPath={homeData?.bestSellersDTO.slug}
      />
      <ProductSection
        title={homeData?.newArrivalsDTO?.name || ""}
        description={homeData?.newArrivalsDTO?.description || ""}
        products={homeData?.newArrivalsDTO.products || []}
        viewPath={homeData?.newArrivalsDTO.slug}
      />
    </MainLayout>
  );
}
