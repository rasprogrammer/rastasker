import { API_BASE_URL } from "@/config/serverApiConfig";
import errorHandler from "@/request/errorHandler";
import successHandler from "@/request/successHandler";
import { getToken, getUserId } from "@/utils/authToken";
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

        const { status, data } = response;
        successHandler({ status, data });

        return data;
    } catch (error) {
        console.log('error response > ', error);
        return errorHandler(error);
    }
}

export const login = async ({ formData: loginData }) => {
    try {
        // console.log('loginData > ',loginData);

        const response = await axios.post(`${API_BASE_URL}auth/login`, {
            email: loginData.email,
            password: loginData.password,
        });

        const { status, data } = response;
        successHandler({ status, data });
        return data;
    } catch (error) {
        const d = errorHandler(error);
    }
};

export const logout = async () => {
    try {
        const token = getToken();
        const id = getUserId();
        const response = await axios.post(`${API_BASE_URL}auth/logout`, {
            token: token,
            _id: id,
        }); 
        const { status, data } = response;

        successHandler({ data, status });
        return data;
    } catch (error) {
        return errorHandler(error);
    }
}