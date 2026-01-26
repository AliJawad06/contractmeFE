'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { SubscriptionCards } from '@/components/dashboard/subscriptions/components/subscription-cards';
import { getSubscriptions } from '@/utils/paddle/get-subscriptions';
import { getUser } from '@/utils/supabase/get-user';
import { updateUser } from '@/app/update/actions';

import { ErrorContent } from '@/components/dashboard/layout/error-content';
import { useToast } from '@/components/ui/use-toast';
import IndustryDropdown from '@/components/authentication/category-checkbox';
import CustomTagDropdown from '@/components/authentication/skill-dropdown';
import LocationDropdown from '@/components/authentication/location-dropdown';

export function DashboardSubscriptionCardGroup() {
  const { toast } = useToast();

  //const subscriptions = await getSubscriptions();
  //const { user, profile, error } = await getUser();

  const [profile, setProfile] = React.useState();

  const [email, setEmail] = React.useState(' ');

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
  const [locations, setLocations] = React.useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([]);
  const [locationInput, setLocationInput] = React.useState('');

  React.useEffect(() => {
    async function fetchProfile() {
      const user = await getUser();
      const error = user.error;
      const profile = user.profile;
      console.log(user);
      setProfile(profile);

      setLocations(profile.locations);
      setSelectedLocations(profile.locations);

      setSkills(profile.skills);
      setSelectedSkills(profile.skills);

      setSelectedIndustries(profile.industries);
    }
    fetchProfile();
  }, []);

  // ✅ Industries

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

  async function handleUpdate() {
    const data = await updateUser({
      email,
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
    <>
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

      <Button onClick={handleUpdate} type="submit" variant="secondary" className="w-full">
        Update
      </Button>
    </>
  );
}
