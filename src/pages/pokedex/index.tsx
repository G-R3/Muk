import Head from "next/head";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";

const Pokedex = () => {
  const { data, error, isLoading } = trpc.useQuery(["get-all-pokemon"], {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 0,
  });

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <h1 className="text-5xl font-bold text-center my-24">Pokedex</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {data?.pokemon?.map((p: any) => (
          <div className="flex flex-col items-center" key={p.id}>
            <div className="bg-zinc-800 rounded-md mb-2 sm:p-5">
              <Image
                src={p.sprite}
                alt={p.name}
                width={256}
                height={256}
                className="bg-cover animate-fadeIn"
              />
            </div>
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pokedex;
