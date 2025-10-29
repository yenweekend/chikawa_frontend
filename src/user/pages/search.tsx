"use client";

import { MainLayout } from "@/user/layouts/main-layout";
import FilterSidebar from "@/user/components/ui/filter"; 
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Sort from "@/user/components/ui/sort"; // 
import ProductCard from "@/user/components/ui/product-card";
import PaginationSection from "@/user/components/ui/pagination-section";

const SortWithState = ({ sort, onSortChange }: { sort: string; onSortChange: (v: string) => void }) => {
  return (
    <div className="flex justify-end mt-4 w-full">
      <div className="flex items-center space-x-2 text-gray-700 text-sm">
        <span>Sort by:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 bg-white rounded-lg px-3 py-1 text-sm outline-none focus:border-black hover:border-gray-400 transition cursor-pointer"
        >
          <option value="relevance">Relevance</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

const SearchPage = () => {

  const [tempValue, setTempValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [price, setPrice] = useState({ min: null as number | null, max: null as number | null });
  const [selectedStock, setSelectedStock] = useState<"in" | "out" | null>(null);
  const [sort, setSort] = useState("relevance");

  const [page, setPage] = useState(1);
  const limit = 24;
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tempValueRef = useRef(tempValue);
  tempValueRef.current = tempValue;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const initialSearchValueFromURL = params.get("q") || "";
    console.log("URL params 'q':", initialSearchValueFromURL);


    setSearchValue(initialSearchValueFromURL);
    setTempValue(initialSearchValueFromURL);    
    setPage(Number(params.get("page")) || 1);
    setSort(params.get("sort") || "relevance");

    const cats = params.get("categories");
    setSelectedCategories(cats ? cats.split(",") : []);

    const chars = params.get("characters");
    setSelectedCharacters(chars ? chars.split(",") : []);

    const min = params.get("minPrice");
    const max = params.get("maxPrice");
    setPrice({
      min: min ? Number(min) : null,
      max: max ? Number(max) : null,
    });

    setSelectedStock(params.get("stock") as "in" | "out" | null || null);
  }, []);

  const fetchSearchResults = async () => {
    const params = new URLSearchParams();

    if (searchValue) params.set("q", searchValue);
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (sort) params.set("sort", sort);

    if (selectedCategories.length > 0) {
      selectedCategories.forEach(cat => params.append("categories", cat));
    }
    if (selectedCharacters.length > 0) {
      selectedCharacters.forEach(char => params.append("characters", char));
    }
    if (price.min !== null) params.set("minPrice", String(price.min));
    if (price.max !== null) params.set("maxPrice", String(price.max));
    if (selectedStock) params.set("stock", selectedStock);

     const cacheBusterKey = `cb_${Date.now()}`; // Tạo tên key mới mỗi lần
  params.set(cacheBusterKey, "1");
    setLoading(true);
    try {
      const response = await fetch(
        `https://yvette-iridescent-buena.ngrok-free.dev/api/v1/search?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Network error");
      const data = await response.json();

      setProducts(data.results || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page >= 1) {
      fetchSearchResults();
    }
  }, [searchValue, page, selectedCategories, selectedCharacters, price, selectedStock, sort]);

  useEffect(() => {

    const params = new URLSearchParams();

    if (searchValue) params.set("q", searchValue);
    params.set("options[prefix]", "last");
    if (page > 1) params.set("page", String(page));
    if (sort !== "relevance") params.set("sort", sort);

    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedCharacters.length > 0) params.set("characters", selectedCharacters.join(","));
    if (price.min !== null) params.set("minPrice", String(price.min));
    if (price.max !== null) params.set("maxPrice", String(price.max));
    if (selectedStock) params.set("stock", selectedStock);

    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newURL);
  }, [searchValue, page, selectedCategories, selectedCharacters, price, selectedStock, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleSearch = () => {
    setSearchValue(tempValueRef.current)
    setPage(1); 
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setTempValue("");
    setSearchValue("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <MainLayout className="mx-auto max-w-7xl w-[90%]">
      <div>
        <p className="my-10 text-center text-2xl font-semibold">Search results</p>

        <div className="relative w-full max-w-3xl mx-auto bg-white">
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={handleKeyDown}
            className="w-full border-2 border-gray-300 px-4 py-3 pt-5 pb-2 text-gray-800 outline-none focus:border-black transition-colors"
          />
          <label
            className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 ${
              focus || tempValue ? "text-sm top-1.5 text-gray-600" : "top-3.5 text-base"
            }`}
          >
            Search
          </label>

          <div className="absolute right-3 top-3.5 flex items-center space-x-3">
            {tempValue && (
              <>
                <button
                  onClick={clearSearch}
                  className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full hover:border-black text-gray-600 hover:cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="h-5 border-l border-gray-300" />
              </>
            )}
            <img
              src="https://www.svgrepo.com/show/489791/search.svg"
              alt="search"
              className="w-7 h-7 cursor-pointer opacity-70 hover:opacity-100 transition"
              onClick={handleSearch}
            />
          </div>
        </div>

        <SortWithState sort={sort} onSortChange={(v) => { setSort(v); setPage(1); }} />

        <div className="flex items-start gap-10 mt-6">
          <FilterSidebar
            selectedCategories={selectedCategories}
            onCategoryToggle={(name) => {
              setSelectedCategories(prev =>
                prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
              );
              setPage(1);
            }}
            selectedCharacters={selectedCharacters}
            onCharacterToggle={(name) => {
              setSelectedCharacters(prev =>
                prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
              );
              setPage(1);
            }}
            price={price}
            onPriceChange={(p) => {
              setPrice(p);
              setPage(1);
            }}
            selectedStock={selectedStock}
            onStockChange={(v) => {
              setSelectedStock(prev => prev === v ? null : v);
              setPage(1);
            }}
            onClearAll={() => {
              setSelectedCategories([]);
              setSelectedCharacters([]);
              setPrice({ min: null, max: null });
              setSelectedStock(null);
              setSearchValue(""); // Xóa giá trị tìm kiếm thực tế
              setTempValue("");
              setSort("relevance");
              setPage(1);
            }}
          />

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loading ? (
                <p className="col-span-full text-center text-gray-500">Đang tải...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.name || "No name"}
                    price={product.price || 0}
                    imgUrl={product.images?.[0]?.trim() || "https://via.placeholder.com/200"}
                    href={`/products/${product.id || ""}`}
                    className="border"
                  />
                ))
              ) : searchValue || selectedCategories.length || selectedCharacters.length || price.min || price.max || selectedStock ? (
                <p className="col-span-full text-center text-gray-500">Not found.</p>
              ) : (
                <p className="col-span-full text-center text-gray-500">Input key words to search</p>
              )}
            </div>

            {products.length > 0 && (
              <PaginationSection
                total={total}
                limit={limit}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;