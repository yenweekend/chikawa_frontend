import type { SelectOption } from "@/user/types/api";
import type { StockStatus } from "@/user/types/products";

export const PRODUCT_STOCK_STATUS_OPTIONS: SelectOption<StockStatus>[] = [
  {
    label: "In Stock",
    value: "availabel",
  },
  {
    label: "Out of Stock",
    value: "sold_out",
  },
];

export const PRODUCT_FILTER_LABELS = {
  status: "Stock Status",
  categories: "Categories",
  characters: "Characters",
  price: "Price",
};
