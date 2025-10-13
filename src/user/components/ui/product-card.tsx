import React from "react";

const ProductCard = () => {
  return (
    <>
      <div className="bg-white w-78.5 h-auto p-7 rounded-[7px] mt-0 pb-10">
        <div className="group">
          <div className="flex justify-center items-center overflow-hidden">
            <img
              className="w-70.5 h-70.5 transition-transform duration-400 group-hover:scale-102"
              src="https://chiikawamarket.jp/cdn/shop/products/000000000797_1.jpg?v=1655033586&width=168"
              alt=""
            />
          </div>
          <div className="text-left mt-2">
            <p className="font-semibold text-[20px] transition-all duration-300 group-hover:underline group-hover:opacity-50 group-hover:cursor-pointer">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
        <div className="text-right mt-2">
          <span>$1000 </span>
          <span className="text-[13px]">(tax)</span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
