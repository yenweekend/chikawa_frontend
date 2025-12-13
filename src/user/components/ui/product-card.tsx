import { cn } from "@/lib/utils/form-utils";
import { Typography } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils/form-utils";
import { Link } from "react-router-dom";
import { DoorOpen } from "lucide-react";
import type { StockStatus } from "@/user/types/products";

interface ProductCardProps {
  title?: string;
  price?: number;
  imgUrl?: string;
  href?: string;
  className?: string;
  status?: StockStatus;
}

const ProductCard = ({
  title = "No title",
  className,
  price = 0,
  href = "#",
  imgUrl = "https://via.placeholder.com/300x300?text=No+Image",
  status = "availabel",
}: ProductCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl  hover:cursor-pointer overflow-hidden p-4 bg-white border-black transition-all duration-300 pb-10 relative",
        className
      )}
    >
      <div className="bg-white p-2 h-full flex flex-col ">
        {status === "sold_out"}
        <div className="absolute bg-black px-3 py-2 rounded-br-2xl text-white top-0 left-0">
          Sold Out
        </div>
        <div className="group flex  justify-center items-center overflow-hidden rounded-lg h-100  ">
          {imgUrl ? (
            <img
              className=" object-cover transition-transform duration-300 group-hover:scale-105"
              src={imgUrl}
              alt={title}
            />
          ) : (
            <DoorOpen className="size-32" />
          )}
        </div>

        <div className="text-left mt-3">
          <Link to={href}>
            <Typography
              variant="h4"
              className="font-semibold text-gray-800 transition-all duration-300 hover:underline hover:opacity-70 line-clamp-2"
            >
              {title}
            </Typography>
          </Link>
        </div>

        <div className="text-right mt-auto">
          <Typography variant="h3" className="text-gray-900">
            ¥{formatPrice(price)}
          </Typography>
          <Typography variant="muted" className="text-[13px] text-gray-500">
            (tax included)
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
