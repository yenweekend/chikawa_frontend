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

export type ProductSearchParams = {
  q: string;
  categories: string[];
  characters: string[];
  minPrice: number | null;
  maxPrice: number | null;
  status: string;
  page: number;
  sortBy: "name" | "id" | "createdAt" | "status";
  sortOrder: "desc" | "asc";
};
