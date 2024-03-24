import { createTRPCRouter, publicProcedure } from "../trpc";
import { LoginSchema, RegisterSchema, VerifyOTPSchema } from "@/schema/auth";
import {
  loginController,
  registerController,
  verifyOtp,
} from "../controllers/auth";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(RegisterSchema)
    .mutation(({ input, ctx }) => registerController({ input, ctx })),

  login: publicProcedure
    .input(LoginSchema)
    .mutation(({ input, ctx }) => loginController({ input, ctx })),

  verify: publicProcedure
    .input(VerifyOTPSchema)
    .mutation(({ input, ctx }) => verifyOtp({ input, ctx })),
});
