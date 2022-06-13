import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { typeToColor } from "../../../utils/typeToColor";

const Pokemon = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const pokemonQuery = trpc.useQuery(["get-pokemon-by-name", { slug }]);

  if (pokemonQuery.error) {
    return <p className="text-center font-bold text-xl">Error</p>;
  }

  if (pokemonQuery.isLoading || pokemonQuery.status !== "success") {
    return <p className="text-center font-bold text-xl">Loading...</p>;
  }

  const { pokemon } = pokemonQuery.data;

  return (
    <div
      className="max-w-5xl mx-auto px-10 py-3 rounded-md"
      style={{ backgroundColor: typeToColor[pokemon?.pokemonTypes[0].name!] }}
    >
      <section className=" relative animate-fadeIn">
        <span className="w-max select-none absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold">
          {pokemon?.altName}
        </span>
        <div className="flex flex-col items-center">
          <div className="self-start">
            <span className="text-lg">
              #{pokemon?.id.toString().padStart(3, "0")}
            </span>
            <h1 className="text-5xl capitalize font-medium">{pokemon?.name}</h1>
          </div>

          <Image
            width={500}
            height={500}
            src={pokemon?.sprite!}
            alt={pokemon?.name}
            className="z-10 select-none"
            priority
          />
        </div>
      </section>
      <section className="flex justify-around items-center">
        <div className="max-w-sm">
          <h2 className="text-xl font-semibold">Bio</h2>
          <p>{pokemon?.description}</p>
        </div>
        <div className="flex gap-5">
          {pokemon?.pokemonTypes.map((type) => (
            <span
              key={type.id}
              className="border-2 px-5 rounded-md select-none"
              style={{
                backgroundColor: typeToColor[type.name],
              }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pokemon;
