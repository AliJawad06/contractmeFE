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

export default function CustomTagDropdown() {
  const [items, setItems] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const toggleSelection = (value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setInputValue('');
    }
  };

  const removeItem = (item: string) => {
    setItems(items.filter((i) => i !== item));
    setSelected(selected.filter((s) => s !== item));
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

        {/* Input for adding new items */}
        <form onSubmit={addItem} className="flex items-center gap-2 px-2 py-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type and press Enter"
            className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" size="sm" variant="secondary">
            Add
          </Button>
        </form>

        <DropdownMenuSeparator />

        {/* Display items with checkboxes + remove option */}
        <div className="max-h-60 overflow-auto">
          {items.map((item) => (
            <div key={item} className="flex items-center">
              <DropdownMenuCheckboxItem
                checked={selected.includes(item)}
                onCheckedChange={() => toggleSelection(item)}
                className="flex-1"
              >
                {item}
              </DropdownMenuCheckboxItem>
              <button
                onClick={() => removeItem(item)}
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
