import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../../../backend/utils/prisma";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("get-pokemon", {
    async resolve() {
      const id = Math.floor(Math.random() * 151) + 1;

      const pokemon = await prisma.pokemon.findUnique({
        where: {
          id,
        },
      });

      if (!pokemon) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the pokemon",
        });
      }

      // TODO: fix this: !
      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
        description: pokemon.description,
        altName: pokemon.altName,
      };
    },
  })
  .query("get-all-pokemon", {
    input: z.object({
      limit: z.number().min(1).max(151).nullish(),
      cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
      const limit = input.limit ?? 151;
      const { cursor } = input;

      const pokemons = await prisma.pokemon.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          pokemonTypes: true,
        },
      });

      if (!pokemons) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching all pokemon",
        });
      }

      let nextCursor: typeof cursor | null = null;
      if (pokemons.length > limit) {
        const nextItem = pokemons.pop();
        nextCursor = nextItem!.id;
      }

      return {
        pokemons,
        nextCursor,
      };
    },
  })
  .query("get-pokemon-by-name", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const pokemon = await prisma.pokemon.findUnique({
        where: {
          name: input.slug,
        },
        include: {
          pokemonTypes: true,
        },
      });

      return {
        pokemon,
      };
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
