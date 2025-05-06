"use client";

export const ReloadButton = () => (
  <button
    className="text-sm text-blue-500 hover:underline ml-2 mt-4"
    onClick={() => window.location.reload()}
  >
    Recarregar
  </button>
);
