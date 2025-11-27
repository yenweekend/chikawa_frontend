import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { type Filter, type PriceFilter } from "@/user/types/common";
import type { ProductCategory, ProductCharacter } from "@/user/types/products";
import type { SelectOption } from "@/user/types/api";
import {
  PRODUCT_STOCK_STATUS_OPTIONS,
  PRODUCT_FILTER_LABELS,
} from "@/user/constants/product";
import { createArrayParamParser, getFilterLabel } from "@/lib/filter";

export type FilterProducts = {
  categories: string[];
  characters: string[];
  status: string;
  price: PriceFilter;
};

export const EMPTY_PRICE_FILTER: PriceFilter = {
  from: undefined,
  to: undefined,
};

export const EMPTY_PRODUCT_FILTERS: FilterProducts = {
  categories: [],
  characters: [],
  status: "",
  price: EMPTY_PRICE_FILTER,
};

const arrayKeys = ["categories", "characters"];

export const useProductFilters = (
  categories: ProductCategory[],
  characters: ProductCharacter[]
) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [appliedFilters, setAppliedFilters] = useState<FilterProducts>(
    EMPTY_PRODUCT_FILTERS
  );

  const categoryOptions: SelectOption[] = useMemo(
    () =>
      (categories || []).map((cat) => ({
        value: cat.slug,
        label: cat.slug,
        description: String(cat.count),
      })),
    [categories]
  );

  const characterOptions: SelectOption[] = useMemo(
    () =>
      (characters || []).map((char) => ({
        value: char.slug,
        label: char.slug,
        description: String(char.count),
      })),
    [characters]
  );

  const labelMaps = useMemo(
    () => [
      ...PRODUCT_STOCK_STATUS_OPTIONS,
      ...categoryOptions,
      ...characterOptions,
    ],
    [categoryOptions, characterOptions]
  );

  const parseArray = useMemo(
    () => createArrayParamParser(searchParams),
    [searchParams]
  );

  const parsePriceFilter = useCallback((): PriceFilter => {
    return {
      from: searchParams.get("minPrice") || "",
      to: searchParams.get("maxPrice") || "",
    };
  }, [searchParams]);

  const updateFiltersFromParams = useCallback(() => {
    setAppliedFilters({
      characters: parseArray("characters"),
      categories: parseArray("categories"),
      status: searchParams.get("status") ?? "",
      price: parsePriceFilter(),
    });

    setSearchKeyword(searchParams.get("p") || "");
  }, [searchParams, parseArray, parsePriceFilter, setSearchKeyword]);

  const applyFilters = useCallback(
    (data: FilterProducts, keyword?: string) => {
      setAppliedFilters(data);
      if (keyword !== undefined) setSearchKeyword(keyword);

      const params = new URLSearchParams();

      params.set("page", "1");

      arrayKeys.forEach((key) => {
        const value = data[key as keyof FilterProducts];
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, JSON.stringify(value));
        }
      });

      if (data.status) {
        params.set("status", data.status);
      }

      if (data.price.from) {
        params.set("minPrice", data.price.from);
      }
      if (data.price.to) {
        params.set("maxPrice", data.price.to);
      }

      const currentKeyword = keyword !== undefined ? keyword : searchKeyword;
      if (currentKeyword.trim()) {
        params.set("keyword", currentKeyword.trim());
      }

      navigate(`/search?${params.toString()}`);
    },
    [navigate, searchKeyword, setSearchKeyword]
  );

  const removeFilter = useCallback(
    (key: string) => {
      const newFilters = { ...appliedFilters };
      if (arrayKeys.includes(key)) {
        delete newFilters[key as keyof FilterProducts];
      } else if (key === "price") {
        (newFilters[key] as PriceFilter) = { from: "", to: "" };
      }
      const params = new URLSearchParams(searchParams.toString());

      if (key === "price") {
        params.delete("minPrice");
        params.delete("maxPrice");
      } else {
        params.delete(key);
      }

      params.set("page", "1");

      if (searchKeyword.trim()) {
        params.set("keyword", searchKeyword.trim());
      }

      navigate(`/search?${params.toString()}`);
      setAppliedFilters(newFilters);
    },
    [appliedFilters, searchKeyword, navigate, searchParams]
  );

  const resetFilters = useCallback(() => {
    navigate("/");
    setAppliedFilters(EMPTY_PRODUCT_FILTERS);
    setSearchKeyword("");
  }, [navigate]);

  const filters: Filter[] = useMemo(() => {
    return (
      Object.entries(appliedFilters) as [
        keyof FilterProducts,
        FilterProducts[keyof FilterProducts]
      ][]
    ).flatMap(([key, value]) => {
      const label = PRODUCT_FILTER_LABELS[key];

      if (arrayKeys.includes(key)) {
        if (!Array.isArray(value) || value.length === 0) return [];

        const mappedLabels = value.map((v: string) =>
          getFilterLabel(labelMaps, v)
        );

        return [{ key, label, value: mappedLabels }];
      }

      if (key === "status" && value) {
        return [
          { key, label, value: [getFilterLabel(labelMaps, value as string)] },
        ];
      }

      if (key === "price" && typeof value === "object" && value !== null) {
        const { from, to } = value as PriceFilter;
        if (!from || !to) return [{ key, label, value: [] }];

        return [{ key, label, value: [`${from} - ${to}`] }];
      }

      return [];
    });
  }, [appliedFilters, labelMaps]);

  useEffect(() => {
    updateFiltersFromParams();
  }, [updateFiltersFromParams]);

  console.log(appliedFilters);

  return {
    appliedFilters,
    searchKeyword,

    characterOptions,
    categoryOptions,

    applyFilters,
    removeFilter,
    resetFilters,

    filters,
    setAppliedFilters,
  };
};
