import { configureStore } from '@reduxjs/toolkit';

import storePersist from './storePersist';

import { reducer as authReducer } from '@/redux/auth';

const AUTH_INITIAL_STATE = {
    current: {},
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
};

const auth_state = storePersist.get('auth') ? storePersist.get('auth') : AUTH_INITIAL_STATE;

const initalState = { auth: auth_state };

const store = configureStore({
    reducer: {
        'auth': authReducer
    },
    preloadedState: initalState,
});

export default store;