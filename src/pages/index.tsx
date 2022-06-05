import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Pokemon from "../components/Pokemon";

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["get-pokemon"], {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }

  if (!data || error) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Pokemon {...data} />
    </div>
  );
};

export default Home;
