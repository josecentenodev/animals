// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
// ====== ANIMAL PARAMS
export type CreateAnimalParams = {
  animal: {
    name: string
    speciesId: string
    description: string
    imageUrl: string
  }
}

export type DeleteAnimalParams = {
  animalId: string
  path: string
}

export type UpdateAnimalParams = {
  animal: {
    _id: string
    name: string
    speciesId: string
    description: string
    imageUrl: string
  }
  path: string
}


// ====== SPECIES PARAMS
export type CreateSpeciesParams = {
  speciesName: string;
};

export type GetAllSpeciesParams = {
  species: string
  limit: number
  page: number
}
// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
