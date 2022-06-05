import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const Home: NextPage<{
  pokemon: { id: number; name: string; sprite: string };
}> = ({ pokemon }) => {
  const [value, setValue] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);

  const makeGuess = () => {
    if (value.toLowerCase() === pokemon.name.toLowerCase()) {
      setCorrect(true);
      return;
    }
    setCorrect(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
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
        {correct ? pokemon.name : "Guess the pokemon!"}
      </h1>

      <div className="flex items-center gap-5">
        <input
          type="text"
          className={`border-2 p-2 rounded-md ${!correct && "border-red-500"}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="text-2xl border-2 rounded-full w-10 h-10"
          onClick={makeGuess}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await (await fetch(`https://pokeapi.co/api/v2/pokemon/1`)).json();

  return {
    props: {
      pokemon: {
        id: res.id,
        name: res.name,
        sprite: res.sprites.other["official-artwork"].front_default,
      },
    },
  };
};

export default Home;
