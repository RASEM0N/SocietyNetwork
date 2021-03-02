import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGGIN_SUCCESS,
    LOGGIN_FAIL,
    LOGOUT,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS: {
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        }
        case REGISTER_FAIL: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        }

        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        }
        case AUTH_ERROR: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        }

        case LOGGIN_SUCCESS: {
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        }
        case LOGGIN_FAIL: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        }

        case LOGOUT: {
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: null,
                loading: false,
                user: null,
            };
        }

        default: {
            return state;
        }
    }
}
