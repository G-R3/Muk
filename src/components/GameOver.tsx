type Props = {
  restart: () => void;
};
export default function GameOver({ restart }: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center mt-10 gap-5">
      <div className="text-center">
        <h1 className="select-none text-red-500 font-bold text-3xl text-center  animate-fadeIn">
          Game Over
        </h1>
      </div>
      <button
        onClick={restart}
        className="select-none border-2 rounded-md p-2 focus:outline-none transition-all focus:ring-2 ring-blue-500"
      >
        Restart
      </button>
    </div>
  );
}
