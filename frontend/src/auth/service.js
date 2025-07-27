import { API_BASE_URL } from "@/config/serverApiConfig";
import errorHandler from "@/request/errorHandler";
import successHandler from "@/request/successHandler";
import { getToken, loggedData } from "@/utils/authToken";
import axios from "axios";

export const register = async ({ formData: registerData }) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}auth/register`,
            registerData
        );

        const { status, data } = response;
        successHandler({ status, data });

        return data;
    } catch (error) {
        return errorHandler(error);
    }
}

export const login = async ({ formData: loginData }) => {
    try {
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
        if (!token) {
            return errorHandler({ message: 'No token provided' });
        }
        
        const response = await axios.post(`${API_BASE_URL}auth/logout`, { }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { status, data } = response;
        successHandler({ data, status });
        return data;
    } catch (error) {
        return errorHandler(error);
    }
}

export const googleAuth = async () => {
    window.location.href = `${API_BASE_URL}auth/google/register`;
}

export const googleCallback = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}auth/google/callback?token=${token}`);
        const { status, data } = response;

        successHandler({ status, data });
        return data;
    } catch (error) {
        return errorHandler(error);
    }
}