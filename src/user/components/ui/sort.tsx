import { useState } from "react";

const Sort = () => {
  const [sort, setSort] = useState("relevance");

  return (
    <div className="flex  justify-end mt-4 w-full ">
      <div className="flex items-center space-x-2 text-gray-700 text-sm">
        <span>Sort by:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 bg-white rounded-lg px-3 py-1 text-sm outline-none focus:border-black hover:border-gray-400 transition cursor-pointer"
        >
          <option value="relevance">Relevance</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
        <p className="text-gray-600 text-sm">147 results</p>
      </div>
    </div>
  );
};

export default Sort;
