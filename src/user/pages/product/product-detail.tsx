import { MainLayout } from "@/user/layouts/main-layout";
import { PageHeader } from "@/user/components/ui/page-header";
import FancyBoxWrapper from "@/user/features/products/fancybox";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/utils/form-utils";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PRODUCTS_DATA } from "@/user/constants/fakeData";
import { ProductSection } from "@/user/features/products/product-section";
import type { Product } from "@/user/types/products";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";
import { getProductDetailAction } from "@/actions/product";
import { Counter } from "@/user/components/ui/counter";
import { DoorOpen } from "lucide-react";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [productDetail, setProductDetail] = useState<Product>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { id } = useParams();

  const swiperRef = useRef<SwiperRef | null>(null);

  const fetchProductDetail = useCallback(async () => {
    try {
      if (!id) return;
      const response = await getProductDetailAction(Number(id));
      if (response?.data) {
        setProductDetail(response.data.result);

        setImages(response.data.result.images ?? []);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPending(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchProductDetail();
  }, [fetchProductDetail, id]);

  const handleQuantityChange = (newQuantity: number) => {
    // setPlanOptionQuantity(option.id.toString(), newQuantity);
    console.log(newQuantity);
    setQuantity(newQuantity);
  };

  const toSlide = (number: number) => {
    setCurrentIdx(number);

    swiperRef.current?.swiper.slideTo(number, 400);
  };

  if (isPending) return "Loading...";

  return (
    <>
      <MainLayout className="space-y-15">
        <div className="mx-auto max-w-[90%] w-[90%]">
          <PageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: productDetail?.name || "" },
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
                                    href={item}
                                    className="h-full absolute inset-0 object-cover w-full"
                                    data-fancybox="gallery"
                                  >
                                    <img
                                      src={item}
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
                                src={item}
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
                  {productDetail?.name ?? "--"}
                </Typography>
                <Typography variant="muted" className="uppercase text-base">
                  Vendor: {productDetail?.vendor ?? "--"}
                </Typography>
                <Typography variant="muted" className="uppercase opacity-75">
                  Product Number : {productDetail?.id ?? "--"}
                </Typography>
                <Typography
                  variant="medium-large"
                  className="text-3xl font-medium "
                >
                  ¥{formatPrice(productDetail?.price ?? 0)}
                </Typography>
                <div className="flex items-center gap-4">
                  {productDetail?.variants &&
                    productDetail.variants.map((variant, index) => (
                      <div
                        className="space-y-2 flex flex-col min-w-0 max-w-25"
                        key={`${variant.name}-${index}`}
                      >
                        <div className="md:size-25 size-15 overflow-hidden flex items-center justify-center border">
                          {variant?.img ? (
                            <img src={variant.img} className="object-cover" />
                          ) : (
                            <DoorOpen className="size-16" />
                          )}
                        </div>
                        <div className="w-full">
                          <Typography variant="muted" className="truncate">
                            {variant.name} Lorem ipsum dolor sit amet
                            consectetur, adipisicing elit. Esse, harum.
                          </Typography>
                        </div>
                      </div>
                    ))}
                </div>
                <Counter
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  max={99}
                  label=""
                  className="items-start mt-2 w-full"
                />
                <Button
                  variant="outline"
                  type="button"
                  className="uppercase w-full h-14"
                >
                  Add to cart
                </Button>
                <Typography variant="muted" className="text-base">
                  {productDetail?.description ?? "--"}
                </Typography>
                <div className="flex items-center gap-3">
                  {productDetail?.categories &&
                    productDetail?.categories.map((cate, index) => (
                      <Button variant="outline" key={`category-${index}`}>
                        {cate.name}
                      </Button>
                    ))}
                  {productDetail?.characters &&
                    productDetail?.characters.map((char, index) => (
                      <Button variant="outline" key={`character-${index}`}>
                        {char.name}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <ProductSection
          title="New Items"
          description="Sale off 50%"
          products={PRODUCTS_DATA}
          viewPath="/"
        />
      </MainLayout>
    </>
  );
};
