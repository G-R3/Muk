import Link from "next/link";

const Navbar = () => {
  return (
    <ul className="flex justify-end p-5 gap-5">
      <li>
        <Link href="/">
          <a>Guess the Mon</a>
        </Link>
      </li>
      <li>
        <Link href="/pokedex">
          <a>Pokedex</a>
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
