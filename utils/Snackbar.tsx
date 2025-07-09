import React from "react";

interface SnackbarProps {
  visible: boolean;
}

const Snackbar = ({ visible }: SnackbarProps) => {
  return (
    <div
      className={`fixed bottom-2 left-1/2 -translate-x-1/2 p-2 rounded bg-card-title text-white text-sm shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      Copied to clipboard
    </div>
  );
};

export default Snackbar;
