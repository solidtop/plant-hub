import { z } from "zod";

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, {
      message: `Username must contain at least ${USERNAME_MIN_LENGTH} characters`,
    })
    .transform((value) => value.replaceAll(" ", "")),
  password: z
    .string()
    .min(8, {
      message: `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`,
    })
    .max(20, {
      message: `Password must contain at most ${PASSWORD_MAX_LENGTH} characters`,
    }),
});

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(USERNAME_MIN_LENGTH, {
        message: `Username must contain at least ${USERNAME_MIN_LENGTH} characters`,
      })
      .transform((value) => value.replaceAll(" ", "")),
    password: z
      .string()
      .min(8, {
        message: `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`,
      })
      .max(20, {
        message: `Password must contain at most ${PASSWORD_MAX_LENGTH} characters`,
      }),
    confirmPassword: z.string(),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
