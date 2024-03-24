import { type PrismaClient } from "@prisma/client/";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { validateToken } from "server/utils";

export const deserializeUser = async (db: PrismaClient) => {
  const cookieStore = cookies();
  try {
    let token;
    if (cookieStore.get("token")) {
      token = cookieStore.get("token")?.value;
    }

    const notAuthenticated = {
      user: null,
    };

    if (!token) {
      return notAuthenticated;
    }

    const decoded = validateToken(token);

    if (!decoded) {
      return notAuthenticated;
    }

    const user = await db.user.findUnique({
      // @ts-ignore
      where: { email: decoded?.email || "" },
    });

    if (!user) {
      return notAuthenticated;
    }

    const { passwordHash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
