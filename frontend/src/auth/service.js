import { API_BASE_URL } from "@/config/serverApiConfig";
import errorHandler from "@/request/errorHandler";
import successHandler from "@/request/successHandler";
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
    axios.defaults.withCredentials = true;
    try {
        // window.localStorage.clear();
        const response = await axios.post(`${API_BASE_URL}auth/logout`);
        const { status, data } = response;

        successHandler({ data, status });
        return data;
    } catch (error) {
        return errorHandler(error);
    }
}