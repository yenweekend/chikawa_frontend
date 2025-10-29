import { useState } from "react";
import StockFilter from "@/user/components/ui/stock-filter";
import CharacterFilter from "@/user/components/ui/character-filter";
import CategoryFilter from "@/user/components/ui/category-filter";
import PriceFilter from "@/user/components/ui/price-filter";

interface FilterItem {
  key: string;
  label: string;
  onRemove: () => void;
}

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedCharacters: string[];
  price: { min: number | null; max: number | null };
  selectedStock: "in" | "out" | null;
  onCategoryToggle: (name: string) => void;
  onCharacterToggle: (name: string) => void;
  onPriceChange: (price: { min: number | null; max: number | null }) => void;
  onStockChange: (value: "in" | "out") => void;
  onClearAll: () => void;
}

const FilterSidebar = ({
  selectedCategories,
  selectedCharacters,
  price,
  selectedStock,
  onCategoryToggle,
  onCharacterToggle,
  onPriceChange,
  onStockChange,
  onClearAll,
}: FilterSidebarProps) => {

  const [showStock, setShowStock] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const clearStock = () => onStockChange(selectedStock!); // toggle off
  const clearCharacter = (name: string) => onCharacterToggle(name);
  const clearCategory = (name: string) => onCategoryToggle(name);
  const clearPrice = () => onPriceChange({ min: null, max: null });

  const activeFilters: FilterItem[] = [];

  if (selectedStock) {
    activeFilters.push({
      key: `stock-${selectedStock}`,
      label: `Stock Status: ${selectedStock === "in" ? "In stock" : "Out of stock"}`,
      onRemove: clearStock,
    });
  }

  selectedCharacters.forEach((char) => {
    activeFilters.push({
      key: `character-${char}`,
      label: `Character: ${char}`,
      onRemove: () => clearCharacter(char),
    });
  });

  selectedCategories.forEach((cat) => {
    activeFilters.push({
      key: `category-${cat}`,
      label: `Category: ${cat}`,
      onRemove: () => clearCategory(cat),
    });
  });

  if (price.min !== null || price.max !== null) {
    activeFilters.push({
      key: "price",
      label: `Price: ${price.min ? "¥" + price.min : "¥0"} - ${
        price.max ? "¥" + price.max : "¥26,400"
      }`,
      onRemove: clearPrice,
    });
  }

  return (
    <div className="bg-[#fff0f0] border w-60 shrink-0 border-pink-100 p-4 rounded-lg text-sm text-gray-700 mt-6">
      {activeFilters.length === 0 ? (
        <>
          <p className="font-medium mb-3 ml-1.5 text-black">Filter:</p>
          <hr className="mb-3" />
        </>
      ) : (
        <div className="mb-3">
          <div className="flex px-1.5 justify-between items-center mb-2">
            <span className="text-black font-medium">Filter:</span>
            <button
              onClick={onClearAll}
              className="underline underline-offset-2 decoration-1 hover:decoration-2 text-black hover:cursor-pointer transition"
            >
              Remove all
            </button>
          </div>

          <div className="space-y-2">
            {activeFilters.map((filter) => (
              <div
                key={filter.key}
                className="min-h-[32px] w-auto flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-full hover:border-gray-500 hover:cursor-pointer transition-all duration-150"
              >
                <span className="text-gray-700">{filter.label}</span>
                <button
                  onClick={filter.onRemove}
                  className="mt-0 mb-1 mr-1 text-gray-500 hover:text-gray-700 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <hr className="mb-3 mt-3" />
        </div>
      )}

      <StockFilter
        show={showStock}
        onToggle={() => setShowStock(!showStock)}
        selectedStock={selectedStock}
        onStockChange={onStockChange}
      />

      <hr className="my-2" />

      <CharacterFilter
        show={showCharacter}
        onToggle={() => setShowCharacter(!showCharacter)}
        selectedCharacters={selectedCharacters}
        onCharacterToggle={onCharacterToggle}
      />

      <hr className="my-2" />

      <CategoryFilter
        show={showCategory}
        onToggle={() => setShowCategory(!showCategory)}
        selectedCategories={selectedCategories}
        onCategoryToggle={onCategoryToggle}
      />

      <hr className="my-2" />

      <PriceFilter
        show={showPrice}
        onToggle={() => setShowPrice(!showPrice)}
        price={price}
        onPriceChange={onPriceChange}
      />
    </div>
  );
};

export default FilterSidebar;