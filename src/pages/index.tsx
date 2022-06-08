import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useState, useRef } from "react";
import Pokemon from "../components/Pokemon";
import GameControls from "../components/GameControls";
import GameOver from "../components/GameOver";
import Head from "next/head";

const TOTAL_ATTEMPTS = 3;
const TOTAL_SKIPS = 3;
const INITIAL_SCORE = 0;

const Home: NextPage = () => {
  const [correct, setCorrect] = useState<boolean>(false);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [totalSkips, setTotalSkips] = useState<number>(0);
  const [score, setScore] = useState<number>(INITIAL_SCORE);

  let timerRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, error, isLoading, refetch } = trpc.useQuery(["get-pokemon"], {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours in ms
  });

  if (isLoading) {
    return <p className="text-center text-2xl font-bold">Loading hang on...</p>;
  }

  if (!data || error) {
    return (
      <p className="text-center text-2xl font-bold">Could not get any mons </p>
    );
  }

  const makeGuess = (value: string) => {
    if (TOTAL_ATTEMPTS <= totalAttempts) {
      return;
    }

    inputRef.current?.focus();

    if (value.toLocaleLowerCase() === data.name.toLocaleLowerCase()) {
      setCorrect(true);
      setScore((prevScore: number) => prevScore + 1);

      timerRef.current = setTimeout(() => {
        setCorrect(false);
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
    refetch();
    setCorrect(false);
    setTotalSkips((prev) => prev + 1);
  };

  const restart = () => {
    setTotalAttempts(0);
    setTotalSkips(0);
    setCorrect(false);
  };

  return (
    <>
      <Head>
        <title>Guess the Mon</title>
      </Head>
      <div className="flex flex-col items-center gap-10 h-screen">
        <div className="max-w-7xl flex flex-col items-center mt-5">
          <p className="text-3xl font-bold mb-5">Score: {score}</p>
          <Pokemon {...data} correct={correct} />

          {TOTAL_ATTEMPTS > totalAttempts ? (
            <>
              <GameControls
                makeGuess={makeGuess}
                skipGuess={skipGuess}
                disableGuessing={TOTAL_ATTEMPTS <= totalAttempts}
                disableSkipping={TOTAL_SKIPS <= totalSkips}
                ref={inputRef}
              />
              <div className="flex justify-between text-gray-400 mt-2 w-full">
                <span>
                  Attempts: {totalAttempts}/{TOTAL_ATTEMPTS}
                </span>
                <span
                  className={`${
                    TOTAL_SKIPS <= totalSkips ? "text-red-400" : ""
                  }`}
                >
                  Skips: {totalSkips}/{TOTAL_SKIPS}
                </span>
              </div>
            </>
          ) : (
            <GameOver restart={restart} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
