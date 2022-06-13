import { PokemonCard } from "./PokemonCard";

interface IPokemons {
  id: number;
  name: string;
  sprite: string;
  description: string;
  altName: string;
  pokemonTypes: { id: number; name: string }[];
}

export const PokemonList = ({ pokemons }: { pokemons: IPokemons[] }) => {
  return (
    <>
      {pokemons.map((pokemon: IPokemons) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </>
  );
};
