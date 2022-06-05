import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useState, useRef } from "react";
import Pokemon from "../components/Pokemon";

const TOTAL_ATTEMPTS = 3;
const TOTAL_SKIPS = 3;

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [totalSkips, setTotalSkips] = useState<number>(0);

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
    if (TOTAL_ATTEMPTS <= totalAttempts) {
      return;
    }

    if (value.toLocaleLowerCase() === data.name.toLocaleLowerCase()) {
      setCorrect(true);

      timerRef.current = setTimeout(() => {
        setCorrect(false);
        setValue("");
        refetch();
        setTotalAttempts(0);
      }, 1000);

      return;
    }
    setTotalAttempts((prev) => prev + 1);
  };

  const skipGuess = () => {
    if (TOTAL_SKIPS <= totalSkips) {
      return;
    }

    clearInterval(timerRef.current);
    setCorrect(false);
    refetch();
    setTotalSkips((prev) => prev + 1);
  };

  const restart = () => {
    setTotalAttempts(0);
    setTotalSkips(0);
    setCorrect(false);
  };

  return (
    <div className="flex flex-col items-center gap-10 h-screen bg-neutral-900 ">
      <div className="max-w-7xl text-white flex flex-col items-center mt-10">
        <Pokemon {...data} correct={correct} />

        {TOTAL_ATTEMPTS > totalAttempts ? (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-5 mt-10">
              <input
                type="text"
                className="border-2 p-2 rounded-md focus:outline-none transition-all focus:ring-2 ring-blue-500 bg-transparent placeholder:text-gray-600"
                value={value}
                placeholder="Guess the mon"
                onChange={(e) => setValue(e.target.value)}
              />

              <button
                className="text-2xl border-2 rounded-md w-10 h-10 focus:outline-none transition-all focus:ring-2 ring-blue-500"
                onClick={makeGuess}
                disabled={TOTAL_ATTEMPTS <= totalAttempts}
              >
                &rarr;
              </button>
            </div>
            <button
              className={`border-2 p-2 rounded-md focus:outline-none transition-all focus:ring-2 ring-blue-500 w-full mt-5 ${
                TOTAL_SKIPS <= totalSkips ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={skipGuess}
              disabled={TOTAL_SKIPS <= totalSkips}
            >
              Skip
            </button>
            <div className="flex justify-between text-gray-400 mt-2">
              <span>
                Attempts: {totalAttempts}/{TOTAL_ATTEMPTS}
              </span>
              <span
                className={`${TOTAL_SKIPS <= totalSkips ? "text-red-400" : ""}`}
              >
                Skips: {totalSkips}/{TOTAL_SKIPS}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-red-500 font-bold text-3xl text-center mt-10 animate-fadeIn">
              Game Over
            </h1>
            <button
              onClick={restart}
              className="border-2 rounded-md p-2 focus:outline-none transition-all focus:ring-2 ring-blue-500"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
