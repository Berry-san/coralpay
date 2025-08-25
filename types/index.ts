import { LoginFormSchema } from "@/app/(auth)/login/validations";
// import { ResetPasswordFormSchema } from "@/app/(auth)/reset-password/validations";
import { ChangePasswordFormSchema } from "@/app/(auth)/change-password/validations";
import { ForgotPasswordFormSchema } from "@/app/(auth)/forgot-password/validations";
import { store } from "@/store";
import * as z from "zod";

const UserSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string(),
  isAuthenticated: z.boolean(),
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordFormSchema>;
// export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
