import React from "react";
import { MainLayout } from "../layouts/main-layout";
import GuideButton from "@/user/components/ui/guide-button";
import GuideSection from "@/user/components/ui/guide-section";
import { guideData } from "@/user/data/guide-data";

const GuidePage = () => {
  const guideTitle = [
    "Member ship",
    "Order",
    "Payments",
    "Delivery",
    "Return/Exchange",
    "Recommended",
  ];


  return (
    <MainLayout>
      <div className="bg-white max-w-[1000px] m-auto mt-10 p-10 border border-gray rounded-xl">
        <h2 className="text-center font-semibold mb-5 text-3xl">User Guide</h2>
        <div className="grid grid-cols-4 gap-3">
          {guideTitle.map((title, index) => (
            <div key={index} className="col-span-1 min-w-0">
              {" "}
              <GuideButton title={title} />
            </div>
          ))}
        </div>
        <div className="mt-10">
          {guideData.map((section, index) => (
            <GuideSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default GuidePage;
