import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils/form-utils";
import ProductCard from "@/user/components/ui/product-card";
import { type Product } from "@/user/types/products";
import { useNavigate } from "react-router-dom";

export interface ProductSectionProps {
  title: string;
  description: string;
  products: Product[];
  viewPath?: string;
  className?: string;
  itemClassName?: string;
}

export const ProductSection = ({
  title,
  description,
  products,
  viewPath,
  className,
  itemClassName,
}: ProductSectionProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "bg-red-100 text-center space-y-8 justify-center py-18",
        className
      )}
    >
      <div className="space-y-2">
        <Typography variant="list" className="text-base tracking-wide">
          {title}
        </Typography>
        <Typography variant="h2" className="uppercase tracking-wide">
          {description}
        </Typography>
      </div>
      <div className="px-8 grid grid-cols-4 gap-4 sm:max-w-[90%] mx-auto">
        {products.length > 0 &&
          products.map((item) => (
            <ProductCard
              key={item?.id}
              title={item?.name}
              price={item?.price}
              imgUrl={
                item?.images !== undefined && item?.images?.length > 0
                  ? item?.images[0]
                  : ""
              }
              href={`/products/${item?.id}`}
              className={cn("basis-1/4 px-2 ", itemClassName)}
            />
          ))}
      </div>
      {viewPath && (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => navigate(viewPath)}
            className="text-xl  text-white bg-blue-400 px-15 py-8 uppercase  font-bold cursor-pointer rounded-full "
          >
            View all
          </Button>
        </div>
      )}
    </div>
  );
};
