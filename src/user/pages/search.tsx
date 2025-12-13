"use client";

import { Typography } from "@/components/ui/typography";
import { MainLayout } from "@/user/layouts/main-layout";

import {
  CommonFilterSheet,
  type FilterSectionConfig,
} from "@/user/components/ui/common-filter-sheet";
import {
  EMPTY_PRODUCT_FILTERS,
  useProductFilters,
  type FilterProducts,
} from "@/user/hooks/use-product-filters";
import {
  type ProductCategory,
  type ProductCharacter,
  type ProductSearchParams,
} from "@/user/types/products";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCT_STOCK_STATUS_OPTIONS } from "@/user/constants/product";
import {
  createFilterResetHandler,
  createFilterSubmitHandler,
} from "@/lib/utils/filter";
import { OptionFilterSection } from "@/user/components/ui/option-filter-section";
import { CheckboxFilterSection } from "@/user/components/ui/checkbox-filter-section";
import { Form, FormField } from "@/components/ui/form";
import { CustomNumberInput } from "@/components/ui/custom-number-input";
import { JapaneseYen, SquareMousePointer } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  filterPriceSchema,
  type FilterPriceFormData,
} from "@/user/schemas/base";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { getConsolidatedErrors } from "@/lib/utils/form-utils";
import { FormErrorList } from "@/components/ui/form-error-list";
import { getSearchAction } from "@/actions/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";
import ProductCard from "@/user/components/ui/product-card";
import { Pagination } from "@/components/ui/pagination";
import { Loading } from "@/user/components/ui/loading";
import { FormSearchField } from "@/components/ui/search-input";

const SearchPage = () => {
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      price: number;
      categories: string[];
      characters: string[];
      images: string[];
      status: string;
    }[]
  >([]);

  const [isPending, setIsPending] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [characters, setCharacters] = useState<ProductCharacter[]>([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get("page") ?? 1);

  const fetchSearchData = useCallback(async () => {
    try {
      const params: ProductSearchParams = {
        characters: JSON.parse(searchParams.get("characters") || "[]"),
        categories: JSON.parse(searchParams.get("categories") || "[]"),
        minPrice: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : undefined,
        maxPrice: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : undefined,
        status: searchParams.get("status") || undefined,
        page: Number(searchParams.get("page") || 1),
        q: searchParams.get("keyword")?.trim() || undefined,
        sortOrder:
          (searchParams.get("sortOrder") as ProductSearchParams["sortOrder"]) ||
          "desc",
      };

      const response = await getSearchAction(params);

      if (response.data) {
        const total = Math.ceil(response.data.total / response.data.limit);
        setTotalPage(total);
        setData(response.data.results);
        setCategories(response.data.categories_count);
        setCharacters(response.data.characters_count);
      }
    } catch (err) {
      console.log(err);

      toast.error(getErrorMessage(err));
    } finally {
      setIsPending(false);
    }
  }, [searchParams]);
  const {
    categoryOptions,
    characterOptions,
    setAppliedFilters,
    appliedFilters,
    applyFilters,
    filters,
    resetFilters,
    removeFilter,
    searchKeyword,
    applySearch,
  } = useProductFilters(categories, characters);

  const [localFilters, setLocalFilters] =
    useState<FilterProducts>(appliedFilters);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<FilterPriceFormData>({
    resolver: zodResolver(filterPriceSchema),
    defaultValues: {
      minPrice: undefined,
      maxPrice: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof filterPriceSchema>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", String(values.minPrice));
    params.set("maxPrice", String(values.maxPrice));
    navigate(`?${params.toString()}`);
  }

  const handleFilterChange = useCallback(
    (fieldName: string, value?: FilterProducts[keyof FilterProducts]) => {
      setLocalFilters((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      setIsDirty(true);
    },
    [setLocalFilters]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const current = new URLSearchParams(searchParams.toString());
      current.set("page", page.toString());
      navigate(`?${current.toString()}`);
    },
    [navigate, searchParams]
  );

  const filterSections: FilterSectionConfig[] = useMemo(
    () => [
      {
        key: "categories",
        title: "Categories",
        fieldName: "categories",
        options: categoryOptions,
        value: "item-1",
        hiddenAllCheckbox: true,
      },
      {
        key: "characters",
        title: "Characters",
        fieldName: "characters",
        options: characterOptions,
        value: "item-2",
        hiddenAllCheckbox: true,
      },
      {
        key: "status",
        title: "Status",
        type: "options",
        fieldName: "status",
        options: PRODUCT_STOCK_STATUS_OPTIONS,
        value: "item-5",
        hiddenAllCheckbox: false,
      },
    ],
    [categoryOptions, characterOptions]
  );

  const handleSubmit = createFilterSubmitHandler(
    localFilters,
    setAppliedFilters,
    applyFilters,
    setIsDirty
  );

  const handleReset = createFilterResetHandler(
    EMPTY_PRODUCT_FILTERS,
    setLocalFilters,
    setIsDirty,
    resetFilters
  );

  useEffect(() => {
    setLocalFilters(appliedFilters);
  }, [appliedFilters]);

  useEffect(() => {
    fetchSearchData();
  }, [fetchSearchData]);

  const priceErrors = getConsolidatedErrors(form.formState.errors, [
    "maxPrice",
  ]);

  if (isPending) return <Loading />;

  return (
    <MainLayout className="mx-auto max-w-[90%] w-[90%]">
      <Typography className="text-center text-2xl uppercase py-10 ">
        Search results
      </Typography>
      <div className="flex items-center justify-center mb-8 relative w-[740px] mx-auto">
        <FormSearchField
          inputProps={{
            placeholder: "Search",
            value: searchKeyword,
          }}
          onDebouncedSearch={(kw) => applySearch(kw)}
          className={"w-full"}
        />
      </div>
      <div className="flex items-start gap-10">
        <div className="shrink-0 w-[300px] bg-[#fff0f0] rounded-lg">
          <CommonFilterSheet
            filterSections={filterSections}
            filters={filters}
            onRemoveFilter={removeFilter}
            onSubmit={handleSubmit}
            onReset={handleReset}
            isDirty={isDirty}
          >
            {filterSections.map((item) => {
              if (item.type === "options") {
                return (
                  <OptionFilterSection
                    key={item.key}
                    value={item.value}
                    title={item.title}
                    options={item.options!}
                    selectedValue={
                      localFilters[
                        item.fieldName as keyof FilterProducts
                      ] as string
                    }
                    onChange={(value: string | undefined) => {
                      handleFilterChange(item.fieldName, value);
                    }}
                  />
                );
              }

              return (
                <CheckboxFilterSection
                  key={item.key}
                  title={item.title}
                  fieldName={item.fieldName}
                  options={item.options!}
                  value={item.value}
                  selectedValues={
                    (localFilters[
                      item.fieldName as keyof FilterProducts
                    ] as string[]) ?? []
                  }
                  hiddenAllCheckbox={item.hiddenAllCheckbox}
                  onChange={(fieldName, values) => {
                    handleFilterChange(fieldName, values);
                  }}
                />
              );
            })}
            <div className="p-5">
              <p className="mb-2 font-medium">Price</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex items-center gap-4 ">
                    <FormField
                      control={form.control}
                      name={"minPrice"}
                      render={({ field }) => (
                        <CustomNumberInput
                          min={0}
                          onChange={(value) =>
                            field.onChange(Number(value) || 0)
                          }
                          prefix={
                            <JapaneseYen className="size-4 text-slate-500" />
                          }
                          inputProps={{
                            placeholder: "1",
                            value: field.value?.toString(),
                            className: "h-14 pl-8 text-left text-sm",
                          }}
                          showFormMessage={false}
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={"maxPrice"}
                      render={({ field }) => (
                        <CustomNumberInput
                          min={0}
                          onChange={(value) =>
                            field.onChange(Number(value) || 0)
                          }
                          prefix={
                            <JapaneseYen className="size-4 text-slate-500" />
                          }
                          inputProps={{
                            placeholder: "1",
                            value: field.value?.toString(),
                            className: "h-14 pl-8 text-left text-sm",
                          }}
                          showFormMessage={false}
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="border-border h-10 rounded-xl text-black shadow-sm hover:text-black mt-2 cursor-pointer"
                    >
                      <SquareMousePointer />
                    </Button>
                  </div>
                  <FormErrorList errors={priceErrors} />
                </form>
              </Form>
            </div>
          </CommonFilterSheet>
        </div>
        <div className="space-y-10">
          <div className="grid grid-cols-4 gap-4 ">
            {data.map((item) => (
              <ProductCard
                key={item.id}
                title={item.name}
                imgUrl={item.images[0]}
                price={item.price}
                href={`/products/${item.id}`}
                className="border"
              />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
