import React from "react";

const GuideButton = ({title}) => {
  return (
    <>
      <div className="bg-blue-500 text-white rounded-xl max-w-65 p-4 border border-transparent transition-all duration-300 hover:bg-white hover:text-blue-500 hover:border-blue-500 cursor-pointer">
        <p className="text-center font-semibold">{title}</p>
      </div>
    </>
  );
};

export default GuideButton;
