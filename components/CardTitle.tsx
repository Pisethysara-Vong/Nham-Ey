import Rating from "@mui/material/Rating";
import { useState } from "react";
import CardContent from "@/components/CardContent";

const CardTitle = () => {
  const rating = 4.3;
  const establishmentType = "Coffee Shop";
  const placeName = "ដាយវើស៍កាហ្វេ Diverse Cafe";
  const numOfRaters = 57;
  const tabs: string[] = ['Overview','Menu', 'Reviews']; // Adjust as needed
  const [activeTab, setActiveTab] = useState("Overview");

  const getWidthClass = () => {
    switch (tabs.length) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      default:
        return "w-1/3";
    }
  };

  const hasMultipleTabs = tabs.length > 1;

  return (
    <>
      <div className={`px-6 py-4 ${hasMultipleTabs ? "pb-0.5" : "pb-4 border-b-2 border-gray-200"}`}>
        <div className="mb-2 card-title">{placeName}</div>
        <div>
          {rating !== undefined && rating !== null && (
            <div className="flex items-center gap-1 card-metadata">
              <span>{rating}</span>
              <Rating
                value={rating}
                precision={0.1}
                readOnly
                className="p-0 m-0 !text-base"
              />
              <span>({numOfRaters})</span>
            </div>
          )}
          <div className="card-metadata">{establishmentType || placeName}</div>
        </div>
      </div>

      {hasMultipleTabs && (
        <div className="flex border-b-2 border-gray-200">
          {tabs.map((tab, index) => {
            const isActive = tab === activeTab;
            const paddingClass =
              index === 0
                ? "pl-6 pr-4"
                : index === tabs.length - 1
                ? "pl-4 pr-6"
                : "px-4";

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${paddingClass} flex justify-center cursor-pointer hover:bg-gray-200 ${getWidthClass()}`}
              >
                <div className="relative py-3">
                  <span className={`relative z-10 ${isActive ? "tabs-active" : "tabs-unactive" }`}>{tab}</span>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] bg-tabs-active transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
      <div className="flex flex-col">
        <CardContent tab={activeTab} />
      </div>
    </>
  );
};

export default CardTitle;
