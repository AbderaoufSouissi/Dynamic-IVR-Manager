import { API_BASE_URL, axiosInstance } from "../api/Api";


export const getAuditById = async (id: number) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/audits/${id}`,{withCredentials:true});
  return response.data;
};


export const getAudits = async (params = {}) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/audits`,{withCredentials:true, params});
  return response.data;
};