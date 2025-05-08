"use client";
import { RefreshCcw } from "lucide-react";

export const ReloadButton = () => (
  <button
    className="text-sm text-blue-500 hover:underline "
    onClick={() => window.location.reload()}
  >
      <RefreshCcw size={15} className="text-white" />
  </button>
);
