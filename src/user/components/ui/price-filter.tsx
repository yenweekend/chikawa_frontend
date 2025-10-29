import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

interface PriceFilterProps {
  show: boolean;
  onToggle: () => void;
  price: { min: number | null; max: number | null };
  onPriceChange: (newPrice: { min: number | null; max: number | null }) => void;
}

const PriceFilter = ({ show, onToggle, price, onPriceChange }: PriceFilterProps) => {
  const [minPrice, setMinPrice] = useState<number | null>(price.min);
  const [maxPrice, setMaxPrice] = useState<number | null>(price.max);

  useEffect(() => {
    onPriceChange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center font-medium rounded-md px-2 py-1 transition"
      >
        <span>Price</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            show ? "rotate-180" : ""
          }`}
        />
      </button>

      {show && (
        <div className="mt-3 ml-1">
          <p className="mb-2 text-sm text-gray-600">
            The highest price is ¥26,400
          </p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white border border-gray-400 px-2 py-2 w-24 rounded">
              <span className="text-gray-500 mr-1">¥</span>
              <input
                type="number"
                min={0}
                placeholder="From"
                value={minPrice ?? ""}
                onChange={(e) =>
                  setMinPrice(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full outline-none bg-transparent text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") e.preventDefault();
                }}
              />
            </div>

            <div className="flex items-center bg-white border border-gray-400 px-2 py-2 w-24 rounded">
              <span className="text-gray-500 mr-1">¥</span>
              <input
                type="number"
                min={1}
                placeholder="To"
                value={maxPrice ?? ""}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full outline-none bg-transparent text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") e.preventDefault();
                }}
              />
            </div>
          </div>

          {(minPrice || maxPrice) && (
            <p className="mt-2 text-xs text-gray-500">
              Range: {minPrice ? `¥${minPrice}` : "¥0"} –{" "}
              {maxPrice ? `¥${maxPrice}` : "¥26,400"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
