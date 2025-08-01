import { API_BASE_URL, axiosInstance } from "../api/Api";
import type { RoleRequest } from "../types/types";

export const getRoles = async (params = {}) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/roles`, {
    params, 
  });

  return response.data;
};

export const createRole = async (roleData: RoleRequest) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/roles`,roleData);
  return response.data
}

export const getRoleById = async (id: number) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/roles/${id}`,{withCredentials:true});
  return response.data;
};


export const updateRole = async (id: number, RoleData: RoleRequest) => {
    const response = await axiosInstance.put(`${API_BASE_URL}/roles/${id}`,RoleData);
    return response.data

}

export const deleteRole = async (id: number) => {
    const response = await axiosInstance.delete(`${API_BASE_URL}/roles/${id}`);
    return response.data


}