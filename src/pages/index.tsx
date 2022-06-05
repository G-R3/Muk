import type { NextPage } from "next";
import Pokemon from "../components/Pokemon";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Pokemon />
    </div>
  );
};

export default Home;
