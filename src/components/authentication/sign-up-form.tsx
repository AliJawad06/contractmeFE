'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import { signup } from '@/app/signup/actions';
import { useToast } from '@/components/ui/use-toast';
import IndustryDropdown from '@/components/authentication/category-checkbox';
import CustomTagDropdown from '@/components/authentication/skill-dropdown';
import LocationDropdown from '@/components/authentication/location-dropdown';

export function SignupForm() {
  const { toast } = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // ✅ Industries
  const [industries, setIndustries] = React.useState<string[]>([
    'Skilled Trades & Construction',
    'Business & Finance',
    'Engineering & Manufacturing',
    'Information Technology & Software Development',
    'Healthcare & Medical',
  ]);
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>([]);

  // ✅ Skills
  const [skills, setSkills] = React.useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  const [skillInput, setSkillInput] = React.useState('');

  // ✅ Locations
  const [locations, setLocations] = React.useState<string[]>(['Remote']);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([]);
  const [locationInput, setLocationInput] = React.useState('');

  // ✅ Shared helpers
  const toggleSelection = (value: string, setFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFn((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const addItem = (value: string, list: string[], setFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setFn((prev) => [...prev, trimmed]);
    }
  };

  const removeItem = (item: string, setFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFn((prev) => prev.filter((i) => i !== item));
  };

  async function handleSignup() {
    const data = await signup({
      email,
      password,
      industries: selectedIndustries,
      skills: selectedSkills,
      locations: selectedLocations,
    });

    if (data?.error) {
      toast({
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <form action="#" className="px-6 md:px-16 pb-6 py-8 gap-6 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-2xl">C</span>
      </div>
      <div className="text-[30px] leading-[36px] font-medium tracking-[-0.6px] text-center">
        Create your Contractly account
      </div>

      {/* ✅ Industry Dropdown */}
      <IndustryDropdown selected={selectedIndustries} onToggle={(val) => toggleSelection(val, setSelectedIndustries)} />

      {/* ✅ Skills Dropdown (editable/removable) */}
      <CustomTagDropdown
        items={skills}
        selected={selectedSkills}
        inputValue={skillInput}
        onInputChange={setSkillInput}
        onAdd={(val) => addItem(val, skills, setSkills)}
        onRemove={(val) => removeItem(val, setSkills)}
        onToggle={(val) => toggleSelection(val, setSelectedSkills)}
      />

      {/* ✅ Location Dropdown (editable/removable) */}
      <LocationDropdown
        items={locations}
        selected={selectedLocations}
        inputValue={locationInput}
        onInputChange={setLocationInput}
        onAdd={(val) => addItem(val, locations, setLocations)}
        onRemove={(val) => removeItem(val, setLocations)}
        onToggle={(val) => toggleSelection(val, setSelectedLocations)}
      />

      <AuthenticationForm email={email} onEmailChange={setEmail} password={password} onPasswordChange={setPassword} />

      <Button onClick={handleSignup} type="submit" variant="secondary" className="w-full">
        Sign up
      </Button>
    </form>
  );
}
