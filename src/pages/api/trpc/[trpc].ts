import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const appRouter = trpc.router().query("get-pokemon", {
  async resolve(): Promise<{
    id: number;
    name: string;
    sprite: string;
  }> {
    const rand = Math.floor(Math.random() * 151) + 1;
    const res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`)
    ).json();

    return {
      id: res.id,
      name: res.name,
      sprite: res.sprites.other["official-artwork"].front_default,
    };
  },
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
