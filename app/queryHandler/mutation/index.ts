"use client";

import {
  activateUser,
  createMerchant,
  createPermission,
  createRole,
  deactivateUser,
  deletePermission,
  deleteRole,
  forgotPassword,
  getAllMerchants,
  getAllPermissions,
  getAllRoles,
  getAllUsers,
  getMerchantById,
  getMerchantRoles,
  getPermissionById,
  getRoleById,
  getRolePermissions,
  getRoles,
  getUserById,
  login,
  refreshToken,
  registerUser,
  resetPassword,
  suspendUser,
  updateRole,
  updateUser,
} from "@/app/apiService";
import { useHandledMutation } from "@/hooks/useHandledMutation";
import { useHandledQuery } from "@/hooks/useHandledQuery";

// Auth Mutation Hooks
export const useLoginMutation = () => {
  return useHandledMutation(login, "Login successful!");
};

export const useForgotPasswordMutation = () => {
  return useHandledMutation(
    forgotPassword,
    "Password reset email sent successfully!"
  );
};

export const useResetPasswordMutation = () => {
  return useHandledMutation(resetPassword, "Password reset successfully!");
};

export const useRefreshTokenMutation = () => {
  return useHandledMutation(refreshToken, "Token refreshed!", () => {}, false);
};

// User Management Query Hooks
export const useGetAllUsers = () => useHandledQuery(["users"], getAllUsers);

export const useGetUserById = (id: string) =>
  useHandledQuery(["users", id], () => getUserById(id), {
    enabled: !!id,
  });

// User Management Mutation Hooks
export const useRegisterUserMutation = () => {
  return useHandledMutation(registerUser, "User registered successfully!");
};

export const useUpdateUserMutation = () => {
  return useHandledMutation(updateUser, "User updated successfully!");
};

export const useSuspendUserMutation = () => {
  return useHandledMutation(suspendUser, "User suspended successfully!");
};

export const useActivateUserMutation = () => {
  return useHandledMutation(activateUser, "User activated successfully!");
};

export const useDeactivateUserMutation = () => {
  return useHandledMutation(deactivateUser, "User deactivated successfully!");
};

// Merchant Management Query Hooks
export const useGetAllMerchants = () =>
  useHandledQuery(["merchants"], getAllMerchants);

export const useGetMerchantById = (id: string) =>
  useHandledQuery(["merchants", id], () => getMerchantById(id), {
    enabled: !!id,
  });

export const useGetMerchantRoles = () =>
  useHandledQuery(["merchant-roles"], getMerchantRoles);

// Merchant Management Mutation Hooks
export const useCreateMerchantMutation = () => {
  return useHandledMutation(createMerchant, "Merchant created successfully!");
};

// Role Management Query Hooks
export const useGetRoles = () => useHandledQuery(["roles"], getRoles);

export const useGetAllRoles = () => useHandledQuery(["all-roles"], getAllRoles);

export const useGetRoleById = (id: string) =>
  useHandledQuery(["roles", id], () => getRoleById(id), {
    enabled: !!id,
  });

export const useGetRolePermissions = (roleId: string) =>
  useHandledQuery(
    ["roles", roleId, "permissions"],
    () => getRolePermissions(roleId),
    {
      enabled: !!roleId,
    }
  );

// Role Management Mutation Hooks
export const useCreateRoleMutation = () => {
  return useHandledMutation(createRole, "Role created successfully!");
};

export const useDeleteRoleMutation = () => {
  return useHandledMutation(deleteRole, "Role deleted successfully!");
};

export const useUpdateRoleMutation = () => {
  return useHandledMutation(updateRole, "Role updated successfully!");
};

// Permission Management Query Hooks
export const useGetAllPermissions = () =>
  useHandledQuery(["permissions"], getAllPermissions);

export const useGetPermissionById = (id: string) =>
  useHandledQuery(["permissions", id], () => getPermissionById(id), {
    enabled: !!id,
  });

// Permission Management Mutation Hooks
export const useCreatePermissionMutation = () => {
  return useHandledMutation(
    createPermission,
    "Permission created successfully!"
  );
};

export const useDeletePermissionMutation = () => {
  return useHandledMutation(
    deletePermission,
    "Permission deleted successfully!"
  );
};
