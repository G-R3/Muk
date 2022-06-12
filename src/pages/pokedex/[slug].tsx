import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { typeToColor } from "../../../utils/typeToColor";

const Pokemon = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const pokemonQuery = trpc.useQuery(["get-pokemon-by-name", { slug }]);

  if (pokemonQuery.error) {
    return <p>Error</p>;
  }

  if (pokemonQuery.isLoading || pokemonQuery.status !== "success") {
    return <p>Loading...</p>;
  }

  const { pokemon } = pokemonQuery.data;

  return (
    <div
      className="relative"
      style={{ backgroundColor: typeToColor[pokemon?.pokemonTypes[0].name!] }}
    >
      <span className="w-max select-none absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold">
        {pokemon?.altName}
      </span>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="self-start">
          <span className="text-lg">
            #{pokemon?.id.toString().padStart(3, "0")}
          </span>
          <h1 className="text-5xl capitalize font-medium">{pokemon?.name}</h1>
        </div>

        <Image
          width={550}
          height={550}
          src={pokemon?.sprite!}
          alt={pokemon?.name}
          className="z-10 select-none"
          priority
        />
      </div>
    </div>
  );
};

export default Pokemon;
