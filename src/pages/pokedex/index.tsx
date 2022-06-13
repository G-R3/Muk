import Head from "next/head";
import { trpc } from "../../../utils/trpc";
import { PokemonList } from "../../components/PokemonList";

const Pokedex = () => {
  const { data, error, isLoading } = trpc.useQuery(["get-all-pokemon"], {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    staleTime: 0,
  });

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <h1 className="text-5xl font-bold text-center my-24">Pokedex</h1>
      <div className="flex flex-wrap justify-center gap-5">
        <PokemonList pokemons={data.pokemon} />
      </div>
    </>
  );
};

export default Pokedex;
