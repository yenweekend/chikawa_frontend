import { MainLayout } from "@/user/layouts/main-layout";
import { useRef } from "react";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductSection } from "@/user/features/products/product-section";
import type { Product } from "@/user/types/products";

export const products: Product[] = [
  {
    id: 1,
    title: "Soft Cotton Hoodie",
    price: 49.99,
    imgUrl:
      "https://chiikawamarket.jp/cdn/shop/products/000000000797_1.jpg?v=1655033586&width=168",
    href: "/products/1",
  },
  {
    id: 2,
    title: "Wireless Noise-Cancelling Headphones",
    price: 129.99,
    imgUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500",
    href: "/products/2",
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    price: 199.0,
    imgUrl:
      "https://chiikawamarket.jp/cdn/shop/products/000000000797_1.jpg?v=1655033586&width=168",
    href: "/products/3",
  },
  {
    id: 4,
    title: "Minimal Wooden Desk Lamp",
    price: 69.5,
    imgUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    href: "/products/4",
  },
  {
    id: 5,
    title: "Smartwatch Pro X2",
    price: 249.99,
    imgUrl:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500",
    href: "/products/5",
  },
  {
    id: 6,
    title: "Ceramic Coffee Mug Set",
    price: 24.99,
    imgUrl:
      "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=500",
    href: "/products/6",
  },
];

export default function HomePage() {
  const sliderRef = useRef<Slider | null>(null);

  const sliderItems = [
    {
      id: 1,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/lineid_sp_231102.png?v=1698885719&width=672",
    },
    {
      id: 2,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/chiikawa_cp20250905_bnr_2.jpg?v=1756443348&width=672",
    },
    {
      id: 3,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/cp20250929_02.jpg?v=1758695091&width=672",
    },
    {
      id: 4,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/ck_bbbn_03.jpg?v=1756975533&width=896",
    },
    {
      id: 5,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_20250718_1.jpg?v=1752735572&width=896",
    },
    {
      id: 6,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_20250718_2.jpg?v=1752735466&width=896",
    },
    {
      id: 7,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_20250627.jpg?v=1750998474&width=896",
    },
    {
      id: 8,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_250613.jpg?v=1749789633&width=896",
    },
    {
      id: 9,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/magicalchiikawa_bnr02.jpg?v=1747961580&width=896",
    },
    {
      id: 10,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/shisamatsuri_bnr.jpg?v=1742893916&width=896",
    },
    {
      id: 11,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_241226.jpg?v=1735116223&width=896",
    },
    {
      id: 12,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_241122.jpg?v=1732239747&width=896",
    },
    {
      id: 13,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_20240927.jpg?v=1727333631&width=896",
    },
    {
      id: 14,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/ck_restaurant_bn1200.jpg?v=1724836437&width=896",
    },
    {
      id: 15,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_20240404.jpg?v=1711504030&width=896",
    },
    {
      id: 16,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/bnr_buta_20240319_7ac4902b-4c8f-48b3-8b08-4380878bd5eb.jpg?v=1710811609&width=896",
    },
    {
      id: 17,
      image:
        "https://chiikawamarket.jp/cdn/shop/files/1040banner05.png?v=1701051794&width=896",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: "40px",
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <MainLayout>
      <div className="py-8 relative bg-[length:20px_20px]">
        <Button
          size="icon"
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                   bg-black/10 text-black border border-black 
                   hover:bg-white hover:text-black 
                   rounded-full shadow-md ml-5 
                   transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="text-3xl" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                   bg-black/10 text-black border border-black 
                   hover:bg-white hover:text-black 
                   rounded-full shadow-md mr-5 
                   transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="" />
        </Button>
        <Slider {...settings}>
          {sliderItems.map((item) => (
            <div key={item.id} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden border-2 border-black">
                <img
                  src={item.image}
                  alt={`Slide ${item.id}`}
                  className="w-full h-full object-cover hover:opacity-50 hover:cursor-pointer transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ProductSection
        title="New Items"
        description="Salge off 50%"
        products={products}
        viewPath="/"
      />
    </MainLayout>
  );
}
