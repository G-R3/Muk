import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useState, useRef } from "react";
import Pokemon from "../components/Pokemon";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);
  let timerRef = useRef<NodeJS.Timeout>();

  const { data, error, isLoading, refetch } = trpc.useQuery(["get-pokemon"], {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <p className="text-center text-2xl font-bold">Loading hang on...</p>;
  }

  if (!data || error) {
    return (
      <p className="text-center text-2xl font-bold">Could not get any mons </p>
    );
  }

  const makeGuess = () => {
    if (value.toLocaleLowerCase() === data.name.toLocaleLowerCase()) {
      setCorrect(true);

      timerRef.current = setTimeout(() => {
        setCorrect(false);
        setValue("");
        refetch();
      }, 1000);
    }
  };

  const skipGuess = () => {
    clearInterval(timerRef.current);
    setCorrect(false);
    refetch();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Pokemon {...data} correct={correct} />
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
        <button onClick={skipGuess}>Skip</button>
      </div>
    </div>
  );
};

export default Home;
