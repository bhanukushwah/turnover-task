import { z, type TypeOf } from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .min(
      8,
      "The password should be at least 8 characters long. The password should contain at least one uppercase letter, one lowercase letter, one number & one special character.",
    )
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      ),
      "The password should be at least 8 characters long. The password should contain at least one uppercase letter, one lowercase letter, one number & one special character.",
    )
    .trim(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const VerifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .min(8, "Please enter the valid OTP.")
    .max(8, "Please enter the valid OTP."),
});

export type CreateUserInput = TypeOf<typeof RegisterSchema>;
export type LoginUserInput = TypeOf<typeof LoginSchema>;
export type VerifyOTPInput = TypeOf<typeof VerifyOTPSchema>;
