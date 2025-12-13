export type Product = {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  price: number;
  status: "available" | "unavailable" | string | "sold_out";
  vendor: string;
  images: string[];
  variants: Variant[];
  categories: Category[];
  characters: Character[];
} | null;

export interface Category {
  name: string;
  slug: string;
}

export interface Character {
  name: string;
  slug: string;
}

export interface Variant {
  name: string;
  img: string;
}

export interface ProductCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: Product[];
}

export type HomeData =
  | {
      bestSellersDTO: ProductCollection;
      newArrivalsDTO: ProductCollection;
    }
  | undefined;

export type ProductCategory = {
  slug: string;
  count: number;
};

export type ProductCharacter = {
  slug: string;
  count: number;
};

export type StockStatus = "availabel" | "sold_out";

export type ProductSearchParams = {
  q?: string;
  categories: string;
  characters: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  status?: string;
  page?: number;
  sortBy?: "name" | "id" | "createdAt" | "status";
  sortOrder?: "desc" | "asc";
};
