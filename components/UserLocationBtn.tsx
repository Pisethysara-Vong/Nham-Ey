"use client";
import { useRef } from "react";
import { MdMyLocation } from "react-icons/md";

export default function BackToLocationButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  const throttleRef = useRef(false);

  const handleClick = () => {
    if (throttleRef.current) return;

    if (onClick) onClick();

    throttleRef.current = true;

    setTimeout(() => {
      throttleRef.current = false;
    }, 1000); // throttle duration in ms
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 util-btn"
      aria-label="Current Location"
    >
      <MdMyLocation className="w-5 h-5" />
    </button>
  );
}
