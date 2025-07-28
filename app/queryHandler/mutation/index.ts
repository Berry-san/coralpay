import { login } from "@/app/(auth)/apiService";
import { useHandledMutation } from "@/hooks/useHandledMutation";

export const useLoginMutation = () => {
  return useHandledMutation(login, "You have successfully logged in!");
};

// export const useSignUpMutation = () => {
//   return useHandledMutation(signUp, "You have successfully signed up!");
// };

// export const useForgotPasswordMutation = () => {
//   return useHandledMutation(
//     forgotPassword,
//     "You have successfully sent the email!"
//   );
// };

// export const useRefreshTokenMutation = () => {
//   return useHandledMutation(
//     refreshToken,
//     "Refresh token sent successfully!",
//     () => {},
//     false
//   );
// };

// export const useResetPasswordMutation = () => {
//   return useHandledMutation(
//     resetPassword,
//     "You have successfully reset your password!"
//   );
// };
