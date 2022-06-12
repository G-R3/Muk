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
    async resolve() {
      const pokemon = await prisma.pokemon.findMany({
        include: {
          pokemonTypes: true,
        },
      });

      if (!pokemon) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching all pokemon",
        });
      }

      return {
        pokemon,
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
        ...pokemon,
      };
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
