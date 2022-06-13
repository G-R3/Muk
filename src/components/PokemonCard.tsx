import Image from "next/image";
import Link from "next/link";
import { typeToColor } from "../../utils/typeToColor";

interface IPokemons {
  id: number;
  name: string;
  sprite: string;
  description: string;
  altName: string;
  pokemonTypes: { id: number; name: string }[];
}

export const PokemonCard = ({
  id,
  name,
  sprite,
  altName,
  pokemonTypes,
}: IPokemons) => {
  return (
    <Link href={`/pokedex/${encodeURIComponent(name)}`} key={id}>
      <a>
        <div className="flex flex-col animate-fadeIn">
          <div
            className="rounded-md mb-2 sm:p-5"
            style={{
              backgroundColor: typeToColor[pokemonTypes[0].name],
            }}
          >
            <Image
              src={sprite}
              alt={name}
              width={150}
              height={150}
              className="bg-cover"
              priority
            />
          </div>
          <div className="flex justify-between">
            <h2>{name}</h2>
          </div>
        </div>
      </a>
    </Link>
  );
};
