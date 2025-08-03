import { API_BASE_URL, axiosInstance } from "../api/Api";
import type { CreateUserRequest, UpdateUserRequest } from "../types/types";





export const getUsers = async (params = {}) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/users`, {
    params, 
  });

  return response.data;
};


export const getUsersByActive = async (params = {}) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/users/status`, {
    params, 
  });

  return response.data;
  
}

export const createUser = async (userData: CreateUserRequest) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/users`,userData);
  return response.data
}

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/users/${id}`,{withCredentials:true});
  return response.data;
};

export const updateUser = async (id: number, userData: UpdateUserRequest) => {
    const response = await axiosInstance.put(`${API_BASE_URL}/users/${id}`,userData);
    return response.data

}

export const deleteUser = async (id: number) => {
    const response = await axiosInstance.delete(`${API_BASE_URL}/users/${id}`);
    return response.data


}