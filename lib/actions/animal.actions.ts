'use server'

import { revalidatePath } from 'next/cache'

import { CreateAnimalParams, DeleteAnimalParams, GetAllSpeciesParams, UpdateAnimalParams } from "@/types/index"
import { connectToDatabase } from "../database/index"
import Animal from "../database/models/animal.model"
import Species from "../database/models/species.model"
import { handleError } from "../utils"
import { getSpeciesByName } from './species.actions'

export const createAnimal = async ({animal}: CreateAnimalParams) => {
    try {
        await connectToDatabase()

        const newAnimal = await Animal.create({...animal, species: animal.speciesId})

        return JSON.parse(JSON.stringify(newAnimal))
    } catch (error) {
        handleError(error)
    }
}

const populateAnimal = (query: any) => {
    return query
      .populate({ path: 'species', model: Species, select: '_id name' })
  }

// GET ALL ANIMALS 
export async function getAllAnimals ({ limit = 6, page, species }: GetAllSpeciesParams) {
    try {
        await connectToDatabase()
    
        const speciesCondition = species ? await getSpeciesByName(species) : null
        const conditions = {
          $and: [ speciesCondition ? { species: speciesCondition._id } : {}],
        }
    
        const animalsQuery = Animal.find(conditions)
          .limit(limit)
    
        const animals = await populateAnimal(animalsQuery)
        const speciesCount = await Species.countDocuments(conditions)
    
        return {
          data: JSON.parse(JSON.stringify(animals)),
          totalPages: Math.ceil(speciesCount / limit),
        }
      } catch (error) {
        handleError(error)
      }
}

// GET ONE ANIMAL BY ID
export async function getAnimalById(animalId: string) {
    try {
      await connectToDatabase()
  
      const animal = await populateAnimal(Animal.findById(animalId))
  
      if (!animal) throw new Error('Animal not found')
  
      return JSON.parse(JSON.stringify(animal))
    } catch (error) {
      handleError(error)
    }
  }

// DELETE
export async function deleteAnimal({ animalId, path }: DeleteAnimalParams) {
    try {
      await connectToDatabase()
  
      const deletedAnimal = await Animal.findByIdAndDelete(animalId)
      if (deletedAnimal) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }

// UPDATE 

export async function updateAnimal({ animal, path }: UpdateAnimalParams) {
  try {
    await connectToDatabase()

    const animalToUpdate = await Animal.findById(animal._id)


    const updatedEvent = await Animal.findByIdAndUpdate(
      animal._id,
      { ...animal, species: animal.speciesId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}