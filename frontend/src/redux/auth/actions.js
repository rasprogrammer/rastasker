import * as actionTypes from "@/redux/auth/types"
import * as authService from "../../auth/service";

export const login = ({ formData }) => async (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });

    await new Promise((resolve, reject) => setTimeout(() => { resolve() }, 200));

    const data = await authService.login({ formData });


    if (data && data.success === true) {
        const auth_state = {
            current: data.result,
            isLoggedIn: true,
            isLoading: false,
            isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.removeItem('isLogout');
        dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload: data.result,
        });
    } else {
        dispatch({ type: actionTypes.REQUEST_FAILED });
    }


}


export const logout = () => async (dispatch) => {
    await new Promise((resolve) => setTimeout(() => {
        console.log('first logout');
        resolve();
    }, 1000))
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    
    await new Promise((resolve) => setTimeout(() => {
        console.log('second logout');
        resolve();
    }, 1000))

    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    const settings = window.localStorage.getItem('settings');
    const tmpSettings = JSON.parse(settings);
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('settings');
    window.localStorage.setItem('isLogout', JSON.stringify({ isLogout: true }));
    const data = await authService.logout();
    if (data.success === false) {
        const auth_state = {
            current: tmpAuth,
            isLoggedIn: true,
            isLoading: false,
            isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.setItem('settings', JSON.stringify(tmpSettings));
        window.localStorage.removeItem('isLogout');
        dispatch({
            type: actionTypes.LOGOUT_FAILED,
            payload: data.result,
        });
    } else {
        // on lgout success
    }

}