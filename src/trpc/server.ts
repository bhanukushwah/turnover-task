import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "server/root";
import { createContext } from "server/context";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const serverCreateContext: any = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createContext({
    headers: heads,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const api = createCaller(serverCreateContext);
