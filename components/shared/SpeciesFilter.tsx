"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllSpecies } from "@/lib/actions/species.actions";
import { ISpecies } from "@/lib/database/models/species.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SpeciesFilter = () => {
  const [species, setSpecies] = useState<ISpecies[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getSpecies = async () => {
      const speciesList = await getAllSpecies();

      speciesList && setSpecies(speciesList as ISpecies[])
    }

    getSpecies();
  }, [])

  const onSelectSpecies = (species: string) => {
      let newUrl = '';

      if(species && species !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'species',
          value: species
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['species']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectSpecies(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {species.map((species) => (
          <SelectItem value={species.name} key={species._id} className="select-item p-regular-14">
            {species.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SpeciesFilter