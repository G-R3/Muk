import { PokemonClient } from "pokenode-ts";
import { prisma } from "../backend/utils/prisma";
import { connect } from "http2";

const MAX_POKEMON = 151;

async function main() {
  const pokemonApi = new PokemonClient();

  console.log("Seeding database...");

  console.log("Creating Pokemons");
  for (let i = 1; i <= MAX_POKEMON; i++) {
    const pokemon = await pokemonApi.getPokemonById(i);
    const pokemonSpecies = await pokemonApi.getPokemonSpeciesById(i);

    const sprite = pokemon.sprites.other["official-artwork"].front_default!;
    const description = pokemonSpecies.flavor_text_entries
      .find((mon) => mon.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ");
    console.log(pokemon.types);
    // types: [ {type: { name: "grass", url: "..."  }} ]
    await prisma.pokemon.create({
      data: {
        name: pokemon.name,
        sprite: sprite,
        description: description,
        altName: pokemonSpecies.names[0].name,
        pokemonTypes: {
          connectOrCreate: pokemon.types.map((type) => ({
            where: {
              name: type.type.name,
            },
            create: {
              name: type.type.name,
            },
          })),
        },
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
