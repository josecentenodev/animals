import SpeciesFilter from "@/components/shared/SpeciesFilter";
import { SearchParamProps } from "@/types/index";
import { getAllAnimals } from "@/lib/actions/animal.actions";
import Collection from "@/components/shared/Collection";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const species = (searchParams?.species as string) || "";

  const animals = await getAllAnimals({
    species,
    page,
    limit: 6,
  });

  return (
    <>
      <section
        id="animals"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Find <br /> Thousands of Animals
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <SpeciesFilter />
        </div>

        <Collection
          data={animals?.data}
          emptyTitle="No Animals Found"
          emptyStateSubtext="Come back later"
          collectionType="All_animals"
          limit={6}
          page={page}
          totalPages={animals?.totalPages}
        />
      </section>
    </>
  );
}
