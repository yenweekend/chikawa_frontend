import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  title: string;
  price: number;
  imgUrl: string;
  href: string;
  className?: string;
}

const ProductCard = ({
  title,
  className,
  price,
  href,
  imgUrl,
}: ProductCardProps) => {
  return (
    <>
      <div className={cn("rounded-2xl overflow-hidden p-4", className)}>
        <div className="bg-white rounded-lg p-6 h-full flex flex-col ">
          <div className="group">
            <div className="flex justify-center items-center overflow-hidden">
              <img
                className="w-70.5 h-70.5 transition-transform duration-400 group-hover:scale-102"
                src={imgUrl}
                alt={title}
              />
            </div>
            <div className="text-left mt-2">
              <Link to={href}>
                <Typography
                  variant="h4"
                  className="font-semibold  transition-all duration-300 group-hover:underline group-hover:opacity-50 group-hover:cursor-pointer text-justify line-clamp-5"
                >
                  {title}
                </Typography>
              </Link>
            </div>
          </div>
          <div className="text-right mt-auto">
            <Typography variant="h3">¥{formatPrice(price)}</Typography>
            <Typography variant="muted" className="text-[13px]">
              (tax included)
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
