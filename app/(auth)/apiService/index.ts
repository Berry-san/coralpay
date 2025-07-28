import { API_AUTH_URL } from "@/config";
import { LoginFormData } from "@/types";
import axios from "@/utils/axios";

export const login = async (data: LoginFormData) => {
  const response = await axios(API_AUTH_URL).post("/login", data);
  return response;
};

// export const signUp = async (data: SignUpFormData) => {
//   const response = await axios(API_AUTH_URL).post("/register", data);
//   return response;
// };

// export const forgotPassword = async (data: ForgotPasswordFormData) => {
//   const response = await axios(API_AUTH_URL).post("/forgot-password", data);
//   return response;
// };

// export const resetPassword = async (data: ResetPasswordFormData) => {
//   const response = await axios(API_AUTH_URL).post("/reset-password", data);
//   return response;
// };

// export const refreshToken = async () => {
//   const response = await axios(API_AUTH_URL).post("/refresh");
//   return response;
// };
