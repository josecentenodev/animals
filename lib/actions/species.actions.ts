'use server'

import Species from "../database/models/species.model";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { CreateSpeciesParams } from "@/types";

export const createSpecies  = async ({ speciesName }: CreateSpeciesParams) => {
    try {
        await connectToDatabase();
    
        const newSpecies = await Species.create({ name: speciesName });
    
        return JSON.parse(JSON.stringify(newSpecies));
      } catch (error) {
        handleError(error)
      }
};

export const getAllSpecies = async () => {
  try {
    await connectToDatabase();

    const species = await Species.find();

    return JSON.parse(JSON.stringify(species));
  } catch (error) {
    handleError(error);
  }
};

export const getSpeciesByName  = async (name: string) => {
  return Species.findOne({ name: { $regex: name, $options: 'i' } })
}