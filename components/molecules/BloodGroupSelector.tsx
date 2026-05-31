"use client";

import type { GolonganDarah } from "@/src/types";

interface BloodGroupSelectorProps {
  selected: GolonganDarah | null;
  onSelect: (golongan: GolonganDarah) => void;
  className?: string;
}

const groups: GolonganDarah[] = ["A", "B", "AB", "O"];

export default function BloodGroupSelector({
  selected,
  onSelect,
  className = "",
}: BloodGroupSelectorProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {groups.map((g) => (
        <button
          key={g}
          onClick={() => onSelect(g)}
          className={`
            flex-1 py-2 rounded-lg text-sm font-bold
            transition-all duration-150 border
            ${
              selected === g
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-surface text-text-primary border-outline-variant hover:border-primary/50 hover:bg-primary/5"
            }
          `}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
