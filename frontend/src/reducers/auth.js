import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGGIN_SUCCESS,
    LOGGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGGIN_SUCCESS:
        case REGISTER_SUCCESS: {
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
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

        case REGISTER_FAIL:
        case LOGGIN_FAIL:
        case AUTH_ERROR:
        case ACCOUNT_DELETED:
        case LOGOUT: {
            localStorage.removeItem('token');
            return {
                ...state,
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
export default auth;
