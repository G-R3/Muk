import Image from "next/image";
import { useEffect, useState } from "react";

export default function Pokemon(): JSX.Element {
  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    sprite: string;
  }>({} as { id: number; name: string; sprite: string });
  const [value, setValue] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);

  useEffect(() => {
    const getInitialPokemon = async () => {
      const rand = Math.floor(Math.random() * 151) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`);
      const data = await res.json();

      setPokemon({
        id: data.id,
        name: data.name,
        sprite: data.sprites.other["official-artwork"].front_default,
      });
    };

    getInitialPokemon();
  }, []);

  const makeGuess = () => {
    if (value.toLowerCase() === pokemon?.name.toLowerCase()) {
      setCorrect(true);

      setTimeout(async () => {
        setCorrect(false);
        const rand = Math.floor(Math.random() * 151) + 1;

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`);
        const data = await res.json();

        setPokemon((prev) => ({
          id: data.id,
          name: data.name,
          sprite: data.sprites.other["official-artwork"].front_default,
        }));
      }, 1500);

      return;
    }
  };

  const newPokemon = async () => {
    const rand = Math.floor(Math.random() * 151) + 1;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`);
    const data = await res.json();

    setPokemon((prev) => ({
      id: data.id,
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default,
    }));
  };

  if (Object.keys(pokemon).length === 0) {
    return <></>;
  }

  return (
    <>
      <Image
        src={pokemon.sprite}
        alt={pokemon.name}
        width={256}
        height={256}
        className="bg-cover animate-fadeIn"
      />

      <h1
        className={`capitalize text-3xl font-medium transition-all ${
          correct ? "scale-1 my-2" : "scale-0 my-[-0.5rem]"
        }`}
      >
        {correct ? pokemon.name : ""}
      </h1>

      <div className="flex items-center gap-5">
        <input
          type="text"
          className={`border-2 p-2 rounded-md`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="text-2xl border-2 rounded-full w-10 h-10"
          onClick={makeGuess}
        >
          &rarr;
        </button>

        <button onClick={newPokemon}>Skip</button>
      </div>
    </>
  );
}
