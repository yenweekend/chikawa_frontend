import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import CustomCheckbox from "@/user/components/ui/custom-checkbox";
import categoryData from "@/user/data/category_slug.json"; 

interface CategoryFilterProps {
  show: boolean;
  onToggle: () => void;
  selectedCategories: string[];
  onCategoryToggle: (name: string) => void;
}

const CategoryFilter = ({
  show,
  onToggle,
  selectedCategories,
  onCategoryToggle,
}: CategoryFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allCategories = categoryData.map((item) => ({
    name: item.name,
    slug: item.slug,
  }));

  const displayedCategories = isExpanded
    ? allCategories
    : allCategories.slice(0, 8); 
  return (
    <div className="my-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center font-medium rounded-md px-2 py-1 transition"
      >
        <span className="hover:underline">Category</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            show ? "rotate-180" : ""
          }`}
        />
      </button>

      {show && (
        <div className="mt-2 ml-2 space-y-1 max-h-[300px] overflow-y-auto pr-1">
          {displayedCategories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onCategoryToggle(cat.name)}
              className={`flex items-center space-x-2 cursor-pointer select-none mb-3 ${
                selectedCategories.includes(cat.name)
                  ? "text-black"
                  : "text-gray-700 hover:underline"
              }`}
            >
              <CustomCheckbox
                isSelected={selectedCategories.includes(cat.name)}
              />
              <span className="text-sm">{cat.name}</span>
            </div>
          ))}

          {allCategories.length > 8 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-black mt-1 ml-1 flex items-center hover:underline"
            >
              {isExpanded ? (
                <>
                  <span className="mr-1">− Show Less</span>
                </>
              ) : (
                <>
                  <span className="mr-1">
                    + Show More ({allCategories.length - 8})
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
