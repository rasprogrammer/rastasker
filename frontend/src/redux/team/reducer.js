import * as actionTypes from './types';

const INITIAL_STATE = {
    isLoading: false,
    team: null,
    error: null,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.RESET_TEAM:
            return INITIAL_STATE;
        case actionTypes.FETCH_REQUEST_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.FETCH_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                team: action.payload,
            }
        case actionTypes.FETCH_REQUEST_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        default:
            return state
    }
}

export default reducer
