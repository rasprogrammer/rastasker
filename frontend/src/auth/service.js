import { API_BASE_URL } from "@/config/serverApiConfig";
import errorHandler from "@/request/errorHandler";
import axios from "axios";

export const register = async ({ formData: registerData }) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}auth/register`,
            {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
            }
        );

        console.log('response > ', response);
    } catch (error) {
        console.log('error response > ', error);
        errorHandler(error);
    }
}