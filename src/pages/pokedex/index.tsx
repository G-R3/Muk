import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import { typeToColor } from "../../../utils/typeToColor";

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
        {data?.pokemon?.map((p) => (
          <Link
            href={`/pokedex/${encodeURIComponent(p.name)}`}
            key={p.id}
            passHref
          >
            <a>
              <div className="flex flex-col hover:scale-110 transition-transform animate-fadeIn">
                <div
                  className="rounded-md mb-2 sm:p-5"
                  style={{
                    backgroundColor: typeToColor[p.pokemonTypes[0].name],
                  }}
                >
                  <Image
                    src={p.sprite}
                    alt={p.name}
                    width={150}
                    height={150}
                    className="bg-cover"
                    priority
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <h2>{p.name}</h2>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pokedex;
