import { API_BASE_URL, axiosInstance } from "../api/Api";
import type { PermissionRequest } from "../types/types";

export const getPermissions = async (params = {}) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/permissions`, {
    params, 
  });

  return response.data;
};

export const createPermission = async (permissionData: PermissionRequest) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/permissions`,permissionData);
  return response.data
}

export const getPermissionById = async (id: number) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/permissions/${id}`,{withCredentials:true});
  return response.data;
};


export const deletePermission = async (id: number) => {
    const response = await axiosInstance.delete(`${API_BASE_URL}/permissions/${id}`);
    return response.data


}