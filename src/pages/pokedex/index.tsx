import { Fragment, useEffect } from "react";
import Head from "next/head";
import { trpc } from "../../../utils/trpc";
import { useInView } from "react-intersection-observer";
import PokemonCard from "../../components/PokemonCard";

const Pokedex = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    trpc.useInfiniteQuery(["get-all-pokemon", { limit: 14 }], {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      staleTime: 0,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (error) {
    return <p className="text-center font-bold text-xl">Error</p>;
  }

  if (isLoading) {
    return <p className="text-center font-bold text-xl">Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <h1 className="text-5xl font-bold text-center my-24">Pokedex</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {data?.pages.map((page) => (
          <Fragment key={page.nextCursor}>
            {page.pokemons.map((pokemon) => (
              <Fragment key={pokemon.id}>
                <PokemonCard {...pokemon} />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} className="text-3xl font-bold text-center py-10">
        {isFetchingNextPage && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Pokedex;
