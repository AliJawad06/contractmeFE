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

interface IndustryDropdownProps {
  selected: string[];
  onToggle: (val: string) => void;
}

export default function IndustryDropdown({ selected, onToggle }: IndustryDropdownProps) {
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
            onCheckedChange={() => onToggle(industry)}
          >
            {industry}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
