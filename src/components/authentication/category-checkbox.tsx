'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function IndustryDropdown() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const toggleSelection = (value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const industries = [
    'Skilled Trades & Construction',
    'Business & Finance',
    'Engineering & Manufacturing',
    'Information Technology & Software Development',
    'Healthcare & Medical',
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selected.length > 0 ? `${selected.length} Selected` : 'Select Industries'}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Industries</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {industries.map((industry) => (
          <DropdownMenuCheckboxItem
            key={industry}
            checked={selected.includes(industry)}
            onCheckedChange={() => toggleSelection(industry)}
          >
            {industry}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
