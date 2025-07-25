import * as actionTypes from './types';

export const INITIAL_STATE = {
    current: {},
    isLoggedIn: false,
    isLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_LOADING:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true,
            }
        case actionTypes.REQUEST_FAILED:
            return INITIAL_STATE;
        case actionTypes.REQUEST_SUCCESS:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                current: null,
                isLoggedIn: false,
                isLoading: false,
            };
        case actionTypes.LOGOUT_REQUEST_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.LOGOUT_SUCCESS:
            return INITIAL_STATE;
        case actionTypes.LOGOUT_FAILED:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
            }
        default:
            return state;
        // case actionTypes.
    }
}

export default authReducer;