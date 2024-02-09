import { IAnimal } from '@/lib/database/models/animal.model'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
  animal: IAnimal,
}

const Card = ({ animal }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

//   const isAnimalOwner = userId === animal.owner._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/animals/${animal._id}`}
        style={{backgroundImage: `url(${animal.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/animals/${animal._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation animalId={animal._id} />
        </div>

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 

          <p className="rounded-full bg-primary-500 px-2 py-1 text-white text-xs max-w-[100px] text-center">
            {animal.species.name}
          </p>

        <Link href={`/animals/${animal._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{animal.name}</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {animal.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card