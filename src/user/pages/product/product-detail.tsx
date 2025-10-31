import { MainLayout } from "@/user/layouts/main-layout";
import { PageHeader } from "@/user/components/ui/page-header";
import FancyBoxWrapper from "@/user/features/products/fancybox";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PRODUCTS_DATA } from "@/user/constants/fakeData";
import { ProductSection } from "@/user/features/products/product-section";

const thumbnails: { id: number; image_url: string }[] = [
  {
    id: 1,
    image_url:
      "https://chiikawamarket.jp/cdn/shop/files/4571609370727__1_rsv_bb422e65-f645-45b2-b5f9-f99d201a5201.jpg?v=1761044046&width=168",
  },
  {
    id: 2,
    image_url:
      "https://chiikawamarket.jp/cdn/shop/files/4571609370727__1_rsv_bb422e65-f645-45b2-b5f9-f99d201a5201.jpg?v=1761044046&width=168",
  },
];

export const ProductDetail = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [images, setImages] = useState<{ id: number; image_url: string }[]>([]);

  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    setImages(thumbnails);
  }, [setImages]);

  const toSlide = (number) => {
    setCurrentIdx(number);

    swiperRef.current?.swiper.slideTo(number, 400);
  };

  return (
    <>
      <MainLayout className="space-y-15">
        <div className="mx-auto max-w-[90%] w-[90%]">
          <PageHeader
            breadcrumbs={[
              { label: "ホーム", href: "/" },
              { label: "全商品", href: "/" },
              { label: "ちいかわ カレンダー2026" },
            ]}
          />
          <FancyBoxWrapper
            options={{
              Carousel: {
                infinite: false,
              },
              Images: {
                zoom: true,
              },
              showClass: "f-fadeIn",
            }}
          ></FancyBoxWrapper>
          <Card className="p-8">
            <div className="flex 2md:gap-[12px] 2md:items-stretch  2md:flex-row gap-25">
              <div className="2md:basis-45 flex-grow-0 w-full">
                <div className="flex flex-col ">
                  <div className=" sticky top-0 flex items-stretch">
                    <div className="w-full space-y-4">
                      <div className=" pb-[100%] w-full relative">
                        <div className="absolute w-full h-full ">
                          <div className={"overflow-hidden flex-auto "}>
                            <Swiper
                              ref={swiperRef}
                              style={
                                {
                                  "--swiper-navigation-color": "#fff",
                                  "--swiper-pagination-color": "#fff",
                                } as React.CSSProperties
                              }
                              loop={false}
                              spaceBetween={10}
                              navigation={true}
                              modules={[FreeMode, Navigation, Thumbs]}
                              className="mySwiper2"
                              onSlideChange={(swiper) => {
                                setCurrentIdx(swiper.activeIndex);
                              }}
                            >
                              {images?.map((item, index) => (
                                <SwiperSlide
                                  key={`swipe-${index}`}
                                  style={{
                                    width: "100%",
                                    paddingBottom: "100%",
                                    position: "relative",
                                  }}
                                >
                                  <a
                                    href={item.image_url}
                                    className="h-full absolute inset-0 object-cover w-full"
                                    data-fancybox="gallery"
                                  >
                                    <img
                                      src={item.image_url}
                                      className={"h-full  object-cover "}
                                    />
                                  </a>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                      <div className="w-full relative  overflow-x-auto no-scrollbar block 2md:hidden">
                        <div className=" flex transition-all ease-linear duration-300 ">
                          {images?.map((item, idx) => (
                            <div
                              className={`${
                                currentIdx === idx
                                  ? "border-blue-600"
                                  : "border-[#eee]"
                              } basis-1/6 flex-shrink-0  [&:not(last-child)]:mr-4 border border-solid  transition-all ease-linear duration-150 cursor-pointer`}
                              key={idx}
                              onClick={() => toSlide(idx)}
                            >
                              <img
                                src={item.image_url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="2md:basis-55 w-full space-y-3">
                <Typography
                  variant="h2"
                  className="line-clamp-5 text-foreground font-medium"
                >
                  【予約】ちいかわ まじかるちいかわ
                  超BIG！おすわりぬいぐるみ（うさぎ）【2026年3月下旬より順次発送予定（発送延期の場合もキャンセル不可）】【通常商品と同時購入・配送希望日指定不可】【キャンペーン対象外】
                </Typography>
                <Typography variant="muted">Gray Parka Service Inc.</Typography>
                <Typography variant="muted">
                  Product Number : 4571609370741
                </Typography>
                <Typography
                  variant="medium-large"
                  className="text-3xl font-normal "
                >
                  ¥{formatPrice(187000)}
                </Typography>
                <Button
                  variant="outline"
                  type="button"
                  className="uppercase w-full h-14"
                >
                  Add to cart
                </Button>
                <Typography variant="muted" className="text-base">
                  ※Chiikawa This product is not eligible for market original
                  ball shipment. Please be aware in advance. Size (approx.):
                  <br />
                  H660×W600×D350mm Weight (approx.): 1.65kg Material: Polyester,
                  Polyurethane Manufacturing Location: China * This product
                  photo is a sample, so it may be slightly different from the
                  actual product. Please note.
                  <br />
                  ※ぬいぐるみの縫製は手作業の為、表情などに個体差がございます。不良品等でない限り、商品の返品・交換はお受けできませんのでご了承ください。
                  * Due to the manufacturing convenience, it may differ slightly
                  from the original character design. Please note.
                </Typography>
              </div>
            </div>
          </Card>
        </div>
        <ProductSection
          title="New Items"
          description="Salge off 50%"
          products={PRODUCTS_DATA}
          viewPath="/"
        />
        <ProductSection
          title="New Items"
          description="Salge off 50%"
          products={PRODUCTS_DATA}
          viewPath="/"
          className="bg-yellow-100"
        />
      </MainLayout>
    </>
  );
};
