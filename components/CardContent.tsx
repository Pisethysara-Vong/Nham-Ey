import { FaDirections, FaGlobeAsia, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import CopyRow from "@/components/CopyRow";
import { FaRegClock } from "react-icons/fa6";

const CardContent = ({ tab }: { tab: string }) => {
  if (tab === "Menu") {
    return <div className="px-6 py-4">Menu</div>;
  }

  if (tab === "Reviews") {
    return <div className="px-6 py-4">Reviews</div>;
  }

  // Default: Overview tab
  return (
    <>
      <div className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 justify-center">
        <button className="flex flex-col items-center gap-1 group">
          <div className="btn-active">
            <FaDirections className="text-base text-white" />
          </div>
          <div className="btn-text">Directions</div>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="btn-unactive">
            <GoShareAndroid className="text-base text-tabs-active" />
          </div>
          <div className="btn-text">Share</div>
        </button>
      </div>

      <div className="pt-2 pb-8 flex flex-col z-0">
        <CopyRow
          icon={FaMapMarkerAlt}
          value="123 Main Street, Phnom Penh"
          tooltip="Copy address"
        />
        <CopyRow
          icon={FaRegClock}
          value="9:00 AM - 10:00 PM"
          noCopy={true}
          tooltip="Opening Hours"
        />
        <CopyRow
          icon={FaGlobeAsia}
          value="example.com"
          tooltip="Go to Website"
          websiteLink={true}
        />
        <CopyRow
          icon={FaPhoneAlt}
          value="(+855) 12 345 678"
          tooltip="Copy Phone Number"
        />
      </div>
    </>
  );
};

export default CardContent;
