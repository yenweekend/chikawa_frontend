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
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";

export const productCategories: ProductCategory[] = [
  { slug: "preorder", count: 120 },
  { slug: "mascot", count: 85 },
  { slug: "home-appliances", count: 42 },
  { slug: "gaming", count: 64 },
  { slug: "books", count: 150 },
];

export const productCharacters: ProductCharacter[] = [
  { slug: "chiikawa", count: 30 },
  { slug: "hachiware", count: 12 },
  { slug: "premium", count: 54 },
  { slug: "durable", count: 76 },
  { slug: "limited-edition", count: 18 },
];

const SearchPage = () => {
  const [data, setData] = useState(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

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
        sortBy:
          (searchParams.get("sortBy") as ProductSearchParams["sortBy"]) ||
          "name",
        sortOrder:
          (searchParams.get("sortOrder") as ProductSearchParams["sortOrder"]) ||
          "desc",
      };

      console.log(params);

      const response = await getSearchAction(params);

      if (response.data) {
        console.log(response.data);
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
  } = useProductFilters(productCategories, productCharacters);

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
    console.log("onSubmit", values);
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

  if (isPending) return "loading...";

  return (
    <MainLayout className="mx-auto max-w-7xl w-[90%]">
      <Typography>Heading</Typography>
      <div className="">sort order</div>
      <div className="flex items-center">
        <div className="w-[300px] bg-[#fff0f0] rounded-lg">
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
      </div>
    </MainLayout>
  );
};

export default SearchPage;
