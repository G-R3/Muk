import Image from "next/image";
import { memo } from "react";

const Pokemon = ({
  id,
  name,
  sprite,
  description,
  altName,
  correct,
}: {
  id: number;
  name: string;
  sprite: string;
  description: string;
  altName: string;
  correct: boolean;
}): JSX.Element => {
  return (
    <>
      <div className="bg-zinc-800 rounded-md mb-5 sm:p-5">
        <Image
          key={id}
          src={sprite}
          alt={name}
          width={256}
          height={256}
          className="bg-cover animate-fadeIn"
          priority
        />
      </div>

      <h1
        className={`text-center capitalize text-3xl font-medium transition-all ${
          correct ? "scale-1" : "scale-0 my-[-0.5rem]"
        }`}
      >
        {correct ? (
          <span>
            {name} <br /> {altName}
          </span>
        ) : (
          <></>
        )}
      </h1>
    </>
  );
};

export default memo(Pokemon);
