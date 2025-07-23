import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;




export const getUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users`)
    return response.data;
    
}

export const updateUser = async () => {

}

export const deleteUser = async () => {

}