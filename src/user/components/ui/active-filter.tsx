import { useState } from "react";

interface ActiveFiltersProps {
  selectedStock: "in" | "out" | null;
  selectedCharacters: string[];
  selectedCategories: string[];
  onClearStock: () => void;
  onClearCharacter: (name: string) => void;
  onClearCategory: (name: string) => void;
  onClearAll: () => void;
}

// Define type for filter item
interface FilterItem {
  key: string;
  label: string;
  onRemove: () => void;
}

const ActiveFilters = ({
  selectedStock,
  selectedCharacters,
  selectedCategories,
  onClearStock,
  onClearCharacter,
  onClearCategory,
  onClearAll,
}: ActiveFiltersProps) => {
  // ✅ Khai báo kiểu rõ ràng
  const activeFilters: FilterItem[] = [];

  if (selectedStock) {
    activeFilters.push({
      key: `stock-${selectedStock}`,
      label: `Stock Status: ${selectedStock === "in" ? "In stock" : "Out of stock"}`,
      onRemove: onClearStock,
    });
  }

  selectedCharacters.forEach((char) => {
    activeFilters.push({
      key: `character-${char}`,
      label: `Character: ${char}`,
      onRemove: () => onClearCharacter(char),
    });
  });

  selectedCategories.forEach((cat) => {
    activeFilters.push({
      key: `category-${cat}`,
      label: `Category: ${cat}`,
      onRemove: () => onClearCategory(cat),
    });
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-pink-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        <button
          onClick={onClearAll}
          className="text-xs text-blue-500 hover:text-blue-700 underline"
        >
          Remove all
        </button>
      </div>

      <div className="space-y-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="flex items-center justify-between px-3 py-1 bg-white border border-gray-200 rounded-full text-xs"
          >
            <span className="text-gray-700">{filter.label}</span>
            <button
              onClick={filter.onRemove}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;