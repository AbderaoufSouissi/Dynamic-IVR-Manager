import { axiosInstance } from "../api/Api"

export const blacklistMsisdn = async (msisdn: string) => {
    const response = await axiosInstance.put("/msisdn/blacklist", msisdn);
    return response.data

    
}
export const WhitelistMsisdn = async (msisdn: string) => {
    const response = await axiosInstance.put("/msisdn/whitelist", msisdn);
    return response.data

    
}

export const resetNbCalls = async (msisdn: string) => {
    const response = await axiosInstance.put("/msisdn/reset", msisdn);
    return response.data

    
}

export const isBlacklisted = async (params = {}) => {
  const response = await axiosInstance.get("/msisdn/is-blacklisted", {
    params,
  });
  return response.data;
};
