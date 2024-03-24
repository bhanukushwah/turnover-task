import { db } from "server/db";
import { type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { deserializeUser } from "server/middlewares/auth";

export const createContext = async (opts: { headers: Headers }) => ({
  db,
  user: await deserializeUser(db),
  ...opts,
});

export type Context =
  | {
      user: null;
      db: PrismaClient<
        {
          log: ("query" | "warn" | "error")[];
        },
        never,
        DefaultArgs
      >;
    }
  | {
      user: {
        id: string;
        email: string;
        name: string | null;
      };
      db: PrismaClient<
        {
          log: ("query" | "warn" | "error")[];
        },
        never,
        DefaultArgs
      >;
    };
