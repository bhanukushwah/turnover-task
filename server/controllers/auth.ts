import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { TRPCError } from "@trpc/server";

import {
  type VerifyOTPInput,
  type CreateUserInput,
  type LoginUserInput,
} from "@/schema/auth";

import { generateOtp, generateToken } from "server/utils";
import { sendOtpMail } from "../utils/email";
import { type Context } from "server/context";

export const sendOtp = async ({
  email,
  ctx,
}: {
  email: string;
  ctx: Context;
}) => {
  const otp = generateOtp();
  const expiry = new Date(new Date().getTime() + 30 * 60 * 1000).toISOString();

  await ctx.db.otp.upsert({
    where: { email },
    create: {
      otp,
      email,
      expiry,
    },
    update: {
      otp,
      email,
      expiry,
    },
  });

  sendOtpMail({ email, otp });
};

export const registerController = async ({
  input,
  ctx,
}: {
  input: CreateUserInput;
  ctx: Context;
}) => {
  try {
    const { name, email, password } = input;

    // check if user already exist and throw error
    const existingUser = await ctx.db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) throw new Error("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await ctx.db.user.create({
      data: {
        email: email,
        name: name,
        passwordHash: hashedPassword,
      },
    });

    const { passwordHash, ...userWithoutPassword } = user;

    // send email with otp
    await sendOtp({ email, ctx });

    return {
      data: {
        user: userWithoutPassword,
      },
      message: "User create successfully",
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already exists",
      });
    }
    throw err;
  }
};

export const loginController = async ({
  input,
  ctx,
}: {
  input: LoginUserInput;
  ctx: Context;
}) => {
  try {
    const { email, password } = input;

    const user = await ctx.db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const compare = await bcrypt.compare(password, user?.passwordHash ?? "");

    if (!user || !compare) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    const { passwordHash, ...userWithoutPassword } = user;

    await sendOtp({ email, ctx });

    return {
      message: "Otp is successfully sent to your email.",
      data: { user: userWithoutPassword },
    };
  } catch (err: any) {
    throw err;
  }
};

export const verifyOtp = async ({
  input,
  ctx,
}: {
  input: VerifyOTPInput;
  ctx: Context;
}) => {
  const { email, otp } = input;

  // Find user by email (unchanged)
  const otpRecord = await ctx.db.otp.findUnique({
    where: { email },
  });

  // Check if OTP record exists for the user
  if (!otpRecord) {
    throw new Error("OTP not found for the provided email");
  }

  // Compare the provided OTP with the OTP stored in the database
  if (otp !== otpRecord.otp) {
    throw new Error("Invalid OTP");
  }

  // Check if the OTP has expired
  const currentTime = new Date();
  if (currentTime > otpRecord.expiry) {
    throw new Error("OTP has expired");
  }

  // OTP is valid and not expired, you can proceed with further actions
  // For example, you can mark the OTP as verified or delete it from the database
  await ctx.db.otp.delete({
    where: { email },
  });

  const user = await ctx.db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  const cookieOptions = {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60,
  };
  cookies().set("token", token, cookieOptions);
  cookies().set("user", JSON.stringify(user), cookieOptions);

  return {
    message: "OTP verification successful",
    data: {
      token,
      user,
    },
  };
};

export const logoutController = async () => {
  try {
    cookies().set("token", "", {
      maxAge: -1,
    });
    return { status: "success" };
  } catch (err: any) {
    throw err;
  }
};
