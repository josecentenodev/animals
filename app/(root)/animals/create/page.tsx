import AnimalForm from "@/components/shared/AnimalForm";
import { auth } from '@clerk/nextjs'

const CreateAnimal = () => {

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Animal</h3>
            </section>

            <div className="wrapper my-8">
                <AnimalForm type="Create" />
            </div>
        </>
    )
}

export default CreateAnimal