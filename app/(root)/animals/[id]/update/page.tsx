import AnimalForm from "@/components/shared/AnimalForm"
import { getAnimalById } from "@/lib/actions/animal.actions"

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {

  const animal = await getAnimalById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <AnimalForm 
          type="Update" 
          animal={animal} 
          animalId={animal._id} 
        />
      </div>
    </>
  )
}

export default UpdateEvent