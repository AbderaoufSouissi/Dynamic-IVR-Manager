import { API_BASE_URL, axiosInstance } from "../api/Api";
import type { UserRequest } from "../types/types";




export const getUsers = async (params = {}) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/users`, {
    params, 
  });

  return response.data;
};


export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/users/${id}`,{withCredentials:true});
  return response.data;
};

export const updateUser = async (id: number, userData: UserRequest) => {
    const response = await axiosInstance.put(`${API_BASE_URL}/users/${id}`,userData);
    return response.data

}

export const deleteUser = async (id: number) => {
    const response = await axiosInstance.delete(`${API_BASE_URL}/users/${id}`);
    return response.data


}