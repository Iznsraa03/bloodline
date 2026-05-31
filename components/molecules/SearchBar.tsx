"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Cari faskes, lokasi...",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div
      className={`
        relative flex items-center w-full
        bg-surface border border-outline-variant rounded-xl
        transition-all duration-150
        focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20
        ${className}
      `}
    >
      <Search className="absolute left-3 h-4 w-4 text-text-secondary" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full py-2.5 pl-10 pr-9
          bg-transparent text-sm text-text-primary
          placeholder:text-text-secondary/50
          focus:outline-none rounded-xl
        "
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 p-0.5 rounded-full hover:bg-surface-container transition-colors"
          aria-label="Hapus pencarian"
        >
          <X className="h-3.5 w-3.5 text-text-secondary" />
        </button>
      )}
    </div>
  );
}
