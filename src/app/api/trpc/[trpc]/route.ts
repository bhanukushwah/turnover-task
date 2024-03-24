import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextResponse, type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "server/root";
import { createContext } from "server/context";
import { cookies } from "next/headers";
/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const clientCreateContext: any = async (req: NextRequest) => {
  return createContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => clientCreateContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            if (error.code == "UNAUTHORIZED") {
              cookies().delete("token");
              cookies().delete("user");
            }
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : ({ error }) => {
            if (error.code == "UNAUTHORIZED") {
              cookies().delete("token");
              cookies().delete("user");
            }

            // we can send error to logging service
          },
  });

export { handler as GET, handler as POST };
