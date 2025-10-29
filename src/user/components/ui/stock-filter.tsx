import { ChevronDownIcon } from "lucide-react";
import CustomCheckbox from "@/user/components/ui/custom-checkbox";

interface StockFilterProps {
  show: boolean;
  onToggle: () => void;
  selectedStock: "in" | "out" | null;
  onStockChange: (value: "in" | "out") => void;
}

const StockFilter = ({ show, onToggle, selectedStock, onStockChange }: StockFilterProps) => {
  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center font-medium bg-[#fff0f0] rounded-md px-2 py-1 transition"
      >
        <span>Stock Status</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${show ? "rotate-180" : ""}`}
        />
      </button>

      {show && (
        <div className="mt-2 space-y-2 ml-2">
          <div
            onClick={() => selectedStock !== "out" && onStockChange("in")}
            className={`flex items-center space-x-2 cursor-pointer select-none mb-5 ${
              selectedStock === "out" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <CustomCheckbox
              isSelected={selectedStock === "in"}
              disabled={selectedStock === "out"}
            />
            <span className="text-sm text-gray-700">In stock (2428)</span>
          </div>

          <div
            onClick={() => selectedStock !== "in" && onStockChange("out")}
            className={`flex items-center space-x-2 cursor-pointer select-none ${
              selectedStock === "in" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <CustomCheckbox
              isSelected={selectedStock === "out"}
              disabled={selectedStock === "in"}
            />
            <span className="text-sm text-gray-700">Out of stock (5101)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockFilter;