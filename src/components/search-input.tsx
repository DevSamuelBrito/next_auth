"use client"

import { useEffect, useId, useState } from "react"
import { LoaderCircleIcon, SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface SearchInputProps {
  onSearch: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ onSearch, value, onChange }: SearchInputProps) {

  return (
    <div className="*:not-first:mt-2 ">
      <div className="relative">
        <Input
          className="peer ps-3 pe-9 w-full"
          placeholder="Search..."
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }
          }
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0 h-4 w-4 text-muted-foreground/80 flex items-center justify-center cursor-pointer"
          onClick={onSearch}
        >
          <SearchIcon size={16} aria-hidden="true" />
        </button>

      </div>
    </div>
  )
}
