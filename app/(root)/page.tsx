import CategoryFilter from "@/components/shared/CategoryFilter";
import Search from "@/components/shared/Search";


export default function Home() {
  return (
    <>
    <section id='animals' className="wrapper my-8 flex flex-col gap-8 md:gap-12">
    <h2 className="h2-bold">Find <br /> Thousands of Animals</h2>
    <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
    </section>
    </>
  );
}
