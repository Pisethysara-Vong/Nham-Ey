import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Snackbar from "@/utils/Snackbar";
import { RxExternalLink } from "react-icons/rx";

interface CopyRowProps {
  icon: IconType;
  value: string;
  tooltip: string;
  noCopy?: boolean;
  websiteLink?: boolean;
}

const CopyRow = ({
  icon: Icon,
  value,
  tooltip,
  noCopy = false,
  websiteLink = false,
}: CopyRowProps) => {
  const [hovered, setHovered] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = async () => {
    if (noCopy) return;
    try {
      await navigator.clipboard.writeText(value);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(value, "_blank");
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between gap-4 px-6 py-2 hover:bg-gray-200 transition-colors group cursor-pointer`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          if (noCopy) return;
          e.stopPropagation();
          handleCopy();
        }}
      >
        {/* Tooltip */}
        {hovered && (
          <div className="absolute -bottom-6 left-6 bg-card-title text-white text-sm px-2 py-1 rounded shadow z-10 pointer-events-none">
            {tooltip}
          </div>
        )}

        {/* Left side: icon + value */}
        <div className="flex items-center gap-4">
          <Icon className="text-xl text-tabs-active" />
          <span
            className={`text-sm text-card-title ${
              websiteLink && hovered ? "underline" : ""
            }`}
          >
            {value}
          </span>
        </div>

        {/* Right side: action buttons or spacer */}
        <div className="flex items-center gap-1 justify-end">
          {websiteLink && (
            <button
              onClick={handleVisit}
              className="rounded-full h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-300"
              title="Visit website"
            >
              <RxExternalLink className="text-gray-800 text-sm" />
            </button>
          )}
          {!noCopy ? (
            <button
              className="rounded-full h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              title="Copy"
            >
              <FaRegCopy className="text-gray-800 text-sm" />
            </button>
          ) : (
            // Placeholder to preserve layout
            <div className="h-8 w-8" />
          )}
        </div>
      </div>

      {/* Snackbar */}
      {!noCopy && <Snackbar visible={showSnackbar} />}
    </div>
  );
};

export default CopyRow;
