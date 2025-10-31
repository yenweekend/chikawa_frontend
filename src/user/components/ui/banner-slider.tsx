import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { BANNER_SLIDER_ITEM_LIST } from "@/user/constants/banner";
import { Button } from "@/components/ui/button";

export const BannerSlider = () => {
  const sliderRef = useRef<Slider | null>(null);

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
    <div className="py-8 relative">
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
      <Slider {...settings} ref={sliderRef}>
        {BANNER_SLIDER_ITEM_LIST.map((item) => (
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
  );
};
