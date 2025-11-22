export type Product = {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  href: string;
};

export type ProductCategory = {
  slug: string;
  count: number;
};

export type ProductCharacter = {
  slug: string;
  count: number;
};

export type StockStatus = "availabe" | "sold_out";
