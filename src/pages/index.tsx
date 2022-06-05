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
    <div className="flex flex-col items-center gap-10 h-screen bg-neutral-900 ">
      <div className="max-w-7xl">
        <Pokemon {...data} correct={correct} />
        <div className="flex items-center gap-5 mt-10">
          <input
            type="text"
            className="border-2 p-2 rounded-md focus:outline-none transition-all focus:ring-2 ring-blue-500 bg-transparent placeholder:text-gray-600"
            value={value}
            placeholder="Guess the mon"
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            className="text-2xl border-2 rounded-md w-10 h-10 text-white focus:outline-none transition-all focus:ring-2 ring-blue-500"
            onClick={makeGuess}
          >
            &rarr;
          </button>
        </div>
        <button
          className="border-2 p-2 rounded-md text-white focus:outline-none transition-all focus:ring-2 ring-blue-500 w-full mt-5"
          onClick={skipGuess}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Home;
