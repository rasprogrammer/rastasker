const actionTypes = {
    "REQUEST_LOADING": "AUTH_REQUEST_LOADING",
    "REQUEST_SUCCESS": "AUTH_REQUEST_SUCCESS",
    "REQUEST_FAILED": "AUTH_REQUEST_FAILED",
    "REGISTER_SUCCESS": "AUTH_REGISTER_SUCCESS",
    "LOGOUT_SUCCESS": "AUTH_LOGOUT_SUCCESS",
    "LOGOUT_FAILED": "AUTH_LOGOUT_FAILED",
}

export const INITIAL_STATE = {
    current: {},
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_LOADING:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true,
                isSuccess: false
            }
        case actionTypes.REQUEST_FAILED:
            return INITIAL_STATE;
        case actionTypes.REQUEST_SUCCESS:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                current: null,
                isLoggedIn: false,
                isLoading: false,
                isSuccess: true,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return INITIAL_STATE;
        case actionTypes.LOGOUT_FAILED:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: false,
            }
        default:
            return state;
        // case actionTypes.
    }
}
