"use client";
import { RefreshCcw } from "lucide-react";

export const ReloadButton = () => (
  <button
    className="text-sm text-blue-500 hover:underline ml-2 mt-4"
    onClick={() => window.location.reload()}
  >
      <RefreshCcw size={20} className="text-white" />
  </button>
);
