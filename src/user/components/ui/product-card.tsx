import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  title?: string;     
  price?: number;
  imgUrl?: string;
  href?: string;
  className?: string;
}

const ProductCard = ({
  title = "No title", 
  className,
  price = 0,
  href = "#",
  imgUrl = "https://via.placeholder.com/300x300?text=No+Image", 
}: ProductCardProps) => {
  return (
    <div className={cn("rounded-xl  hover:cursor-pointer overflow-hidden p-4 bg-white border-black transition-all duration-300", className)}>
      <div className="bg-white p-2 h-full flex flex-col">
        <div className="group flex  justify-center items-center overflow-hidden rounded-lg">
          <img
            className="w-70.5 h-70.5 object-cover transition-transform duration-300 group-hover:scale-105"
            src={imgUrl}
            alt={title}
          />
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

        {/* Giá */}
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
