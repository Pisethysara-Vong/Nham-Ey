import React from "react";

interface SnackbarProps {
  visible: boolean;
  message: string;
}

const Snackbar = ({ visible, message }: SnackbarProps) => {
  return (
    <div
      className={`fixed bottom-2 left-1/2 -translate-x-1/2 p-2 rounded bg-card-title text-white text-sm text-center shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
