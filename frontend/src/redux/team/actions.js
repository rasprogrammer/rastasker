import * as actionTypes from './types';
import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { getToken } from "@/utils/authToken";
import errorHandler from "@/request/errorHandler";
import successHandler from "@/request/successHandler";

export const fetchTeams = () => async (dispatch, getState) => {
    // return;
    dispatch({ type: actionTypes.FETCH_REQUEST_LOADING });
    try {
        console.log('fetching data ....');
        console.log('state > ', getState().team);
        console.log('token > ', getToken());
        // fetching data from backend 
        const response = await axios.get(`${API_BASE_URL}team`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        console.log('respnse >>> ', response);
        const { status, data } = response;
        successHandler({ status, data }, true);

        console.log('data .>> ', data);

        if (data && data.success === true) {
            dispatch({
                type: actionTypes.FETCH_REQUEST_SUCCESS,
                payload: data.result || []
            });

        } else {
            dispatch({ type: actionTypes.FETCH_REQUEST_FAILED });
        }
    } catch (error) {
        errorHandler(error);
        dispatch({ type: actionTypes.FETCH_REQUEST_FAILED });
    }

    // dispatch(actionTypes.)
}


export const addTeam = ({ name }) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}team`, { name }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        });
        const { status, data } = response;
        console.log(' add response', response);
        successHandler({ status, data });
        return;
    } catch (error) {
        errorHandler(error);
    }
    console.log('before > ');
    await dispatch(fetchTeams());
    console.log('after > ');
}

export const editTeam = ({ id, name }) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_BASE_URL}team/${id}`, { name }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        });
        const { status, data } = response;
        successHandler({ status, data });
    } catch (error) {
        errorHandler(error);
    }
    dispatch(fetchTeams());
}

export const deleteTeam = ({ id }) => async (dispatch) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}team/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        console.log('respnose > ', response);
        const { status, data } = response;
        successHandler({ status, data });
    } catch (error) {
        console.log('error > ', error);
        errorHandler(error);
    } 
    dispatch(fetchTeams());
}