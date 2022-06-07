import { PokemonClient } from "pokenode-ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MAX_POKEMON = 151;

async function main() {
  const pokemonApi = new PokemonClient();

  console.log("Seeding database...");
  for (let i = 1; i <= MAX_POKEMON; i++) {
    const pokemon = await pokemonApi.getPokemonById(i);
    const pokemonSpecies = await pokemonApi.getPokemonSpeciesById(i);

    const sprite = pokemon.sprites.other["official-artwork"].front_default!;
    const description = pokemonSpecies.flavor_text_entries
      .find((mon) => mon.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ");

    await prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        sprite: sprite,
        description: description,
        altName: pokemonSpecies.names[0].name,
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
