import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

interface IPokemon {
  id: number;
  name: string;
  sprite: string;
  description: string;
  altName: string;
}

export const appRouter = trpc
  .router()
  .query("get-pokemon", {
    async resolve(): Promise<IPokemon> {
      const prisma = new PrismaClient();
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
        sprite: pokemon.sprite!,
        description: pokemon.description!,
        altName: pokemon.altName,
      };
    },
  })
  .query("get-all-pokemon", {
    async resolve() {
      const prisma = new PrismaClient();

      const pokemon = await prisma.pokemon.findMany();

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
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
