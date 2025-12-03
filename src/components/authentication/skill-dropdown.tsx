'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { X } from 'lucide-react';

interface CustomTagDropdownProps {
  items: string[];
  selected: string[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onAdd: (val: string) => void;
  onRemove: (val: string) => void;
  onToggle: (val: string) => void;
}

export default function CustomTagDropdown({
  items,
  selected,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
  onToggle,
}: CustomTagDropdownProps) {
  // Form submit handler that calls onAdd prop
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(inputValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-30 justify-between">
          {selected.length > 0 ? `${selected.length} Selected` : 'Add Skills'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Relevant Skills</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* ✅ Input for adding new items */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2 py-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type and press Enter"
            className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" size="sm" variant="secondary">
            Add
          </Button>
        </form>

        <DropdownMenuSeparator />

        {/* ✅ Display items with checkboxes + remove option */}
        <div className="max-h-60 overflow-auto">
          {items.map((item) => (
            <div key={item} className="flex items-center">
              <DropdownMenuCheckboxItem
                checked={selected.includes(item)}
                onCheckedChange={() => onToggle(item)}
                className="flex-1"
              >
                {item}
              </DropdownMenuCheckboxItem>
              <button
                onClick={() => onRemove(item)}
                className="mr-2 text-muted-foreground hover:text-destructive"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
