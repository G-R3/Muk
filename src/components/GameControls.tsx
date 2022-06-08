import { forwardRef, Ref, useState } from "react";

type Props = {
  skipGuess: () => void;
  makeGuess: (arg0: string) => void;
  disableGuessing: boolean;
  disableSkipping: boolean;
};

const GameControls = (
  props: Props,
  ref: Ref<HTMLInputElement>,
): JSX.Element => {
  const [value, setValue] = useState<string>("");

  const { skipGuess, makeGuess, disableGuessing, disableSkipping } = props;

  return (
    <div className="animate-fadeIn w-full">
      <div className="flex items-center gap-5 mt-5">
        <input
          ref={ref}
          type="text"
          className="flex-grow border-2 p-2 rounded-md focus:outline-none transition-all focus:ring-2 ring-blue-500 bg-transparent placeholder:text-gray-600"
          value={value}
          placeholder="Guess the mon"
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          className="text-2xl border-2 rounded-md w-10 h-10 focus:outline-none transition-all focus:ring-2 ring-blue-500"
          onClick={() => {
            makeGuess(value);
            setValue("");
          }}
          disabled={disableGuessing}
        >
          &rarr;
        </button>
      </div>
      <button
        className={`border-2 p-2 rounded-md focus:outline-none transition-all focus:ring-2 ring-blue-500 w-full mt-5 ${
          disableSkipping ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={skipGuess}
        disabled={disableSkipping}
      >
        Skip
      </button>
    </div>
  );
};

export default forwardRef(GameControls);
