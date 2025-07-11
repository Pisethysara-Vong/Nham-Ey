"use client";
import { useRef } from "react";
import { MdFastfood } from "react-icons/md";

export default function ShowInputFormButton({
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
      className="fixed bottom-20 util-btn"
      aria-label="Find Places to Eat"
      title="Find Places to Eat"
    >
      <MdFastfood className="w-5 h-5" />
    </button>
  );
}
