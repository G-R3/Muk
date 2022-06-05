import Image from "next/image";

export default function Pokemon({
  id,
  name,
  sprite,
  correct,
}: {
  id: number;
  name: string;
  sprite: string;
  correct: boolean;
}): JSX.Element {
  return (
    <>
      <Image
        key={id}
        src={sprite}
        alt={name}
        width={256}
        height={256}
        className="bg-cover animate-fadeIn"
      />

      <h1
        className={`text-center capitalize text-3xl font-medium transition-all ${
          correct ? "scale-1 my-2" : "scale-0 my-[-0.5rem]"
        }`}
      >
        {correct ? name : ""}
      </h1>
    </>
  );
}
