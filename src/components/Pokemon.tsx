import Image from "next/image";
import { useState } from "react";

export default function Pokemon({
  id,
  name,
  sprite,
}: {
  id: number;
  name: string;
  sprite: string;
}): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);

  return (
    <>
      <Image
        src={sprite}
        alt={name}
        width={256}
        height={256}
        className="bg-cover animate-fadeIn"
      />

      <h1
        className={`capitalize text-3xl font-medium transition-all ${
          correct ? "scale-1 my-2" : "scale-0 my-[-0.5rem]"
        }`}
      >
        {correct ? name : ""}
      </h1>

      <div className="flex items-center gap-5">
        <input
          type="text"
          className={`border-2 p-2 rounded-md`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="text-2xl border-2 rounded-full w-10 h-10">
          &rarr;
        </button>

        <button>Skip</button>
      </div>
    </>
  );
}
