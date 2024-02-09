"use client";

import { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISpecies } from "@/lib/database/models/species.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { createSpecies, getAllSpecies } from "@/lib/actions/species.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [species, setSpecies] = useState<ISpecies[]>([]);
  const [newSpecies, setNewSpecies] = useState("");
  const handleAddSpecies = () => {
    createSpecies({
      speciesName: newSpecies.trim()
    })
      .then((species) => {
        setSpecies((prevState) => [...prevState, species])
      })
  }

  useEffect(() => {
    const getSpecies = async () => {
      const speciesList = await getAllSpecies();

      speciesList && setSpecies(speciesList as ISpecies[])
    }

    getSpecies();
  }, [])

  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={value}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Species" />
      </SelectTrigger>
      <SelectContent>
        {species.length > 0 &&
          species.map((species) => (
            <SelectItem
              key={species._id}
              value={species._id}
              className="select-item p-regular-14"
            >
              {species.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new species
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Species</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Species name"
                  className="input-field mt-3"
                  onChange={(e) => setNewSpecies(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddSpecies)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
