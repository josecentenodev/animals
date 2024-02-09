import { SearchParamProps } from "@/types";
import Image from "next/image";
import { getAnimalById } from "@/lib/actions/animal.actions";

const AnimalDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const animal = await getAnimalById(id);

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={animal.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{animal.name}</h2>
            <p className="rounded-full bg-primary-500 px-2 py-1 text-white text-xs max-w-[100px] text-center">
              {animal.species.name}
            </p>
            <p className="p-medium-16 lg:p-regular-18">{animal.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimalDetails;
