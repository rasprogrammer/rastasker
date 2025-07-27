import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';

export const getUser = () => {
    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    return tmpAuth?.current || {};
}

export const getToken = () => {
    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    return tmpAuth?.current?.token || '';
}

export const getUserId = () => {
    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    return tmpAuth?.current?._id || '';
}

export const getAuthState = () => {
    const result = window.localStorage.getItem('auth');
    return JSON.parse(result) || {};
}

export const loggedData = (token) => {
    try {
        return axios.post(`${API_BASE_URL}auth/user`, { token })
            .then(response => {
                const { data } = response;
                if (data && data.success) {
                    return data.result;
                }
                return false;
            });
    } catch(error) {
        return false;
    }
}