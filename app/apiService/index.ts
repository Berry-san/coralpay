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

export const forgotPassword = async (data: any) => {
  const response = await axios(API_AUTH_URL).post("/forgot-password", data);
  return response;
};

export const resetPassword = async (data: any) => {
  const response = await axios(API_AUTH_URL).post("/reset-password", data);
  return response;
};

export const refreshToken = async () => {
  const response = await axios(API_AUTH_URL).post("/refresh");
  return response;
};

export const getAllUsers = async () => {
  const response = await axios(API_AUTH_URL).get("/users");
  return response;
};

export const registerUser = async (data: any) => {
  const response = await axios(API_AUTH_URL).post("/users", data);
  return response;
};

export const updateUser = async (data: any) => {
  const response = await axios(API_AUTH_URL).put("/users", data);
  return response;
};

export const getUserById = async (id: string) => {
  const response = await axios(API_AUTH_URL).get(`/users/${id}`);
  return response;
};

export const suspendUser = async (id: string) => {
  const response = await axios(API_AUTH_URL).post(`/users/${id}/suspend`);
  return response;
};

export const activateUser = async (id: string) => {
  const response = await axios(API_AUTH_URL).post(`/users/${id}/activate`);
  return response;
};

export const deactivateUser = async (id: string) => {
  const response = await axios(API_AUTH_URL).post(`/users/${id}/deactivate`);
  return response;
};

export const getAllMerchants = async () => {
  const response = await axios(API_AUTH_URL).get("/merchants");
  return response;
};

export const getMerchantById = async (id: string) => {
  const response = await axios(API_AUTH_URL).get(`/merchants/${id}`);
  return response;
};

export const createMerchant = async (data: any) => {
  const response = await axios(API_AUTH_URL).post("/merchants", data);
  return response;
};

export const getMerchantRoles = async () => {
  const response = await axios(API_AUTH_URL).get(`/merchants/roles`);
  return response;
};

export const getRoles = async () => {
  const response = await axios(API_AUTH_URL).get("/roles");
  return response;
};

export const getAllRoles = async () => {
  const response = await axios(API_AUTH_URL).get("/roles");
  return response;
};

export const createRole = async (data: any) => {
  const response = await axios(API_AUTH_URL).post("/roles", data);
  return response;
};

export const deleteRole = async (id: string) => {
  const response = await axios(API_AUTH_URL).delete(`/roles/${id}`);
  return response;
};

export const getRoleById = async (id: string) => {
  const response = await axios(API_AUTH_URL).get(`/roles/${id}`);
  return response;
};

export const updateRole = async (data: any) => {
  const response = await axios(API_AUTH_URL).put("/roles", data);
  return response;
};

export const getRolePermissions = async (roleId: string) => {
  const response = await axios(API_AUTH_URL).get(
    `/roles/${roleId}/permissions`
  );
  return response;
};

export const getAllPermissions = async () => {
  const response = await axios(API_AUTH_URL).get("/permissions");
  return response;
};

export const getPermissionById = async (id: string) => {
  const response = await axios(API_AUTH_URL).get(`/permissions/${id}`);
  return response;
};

export const createPermission = async (data: any) => {
  const response = await axios(API_AUTH_URL).post("/permissions", data);
  return response;
};

export const deletePermission = async (id: string) => {
  const response = await axios(API_AUTH_URL).delete(`/permissions/${id}`);
  return response;
};
