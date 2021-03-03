import axios from 'axios';
import { URL } from '../config/config';
import {
    AUTH_ERROR,
    CLEAR_PROFILE,
    LOGGIN_FAIL,
    LOGGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        name,
        email,
        password,
    });

    try {
        const response = await axios.post(`${URL}/api/users`, body, config);

        console.log(response.data);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        });
        dispatch(loadUser());
    } catch (e) {
        const errors = e.response.data.errors;
        errors.forEach((error) => {
            dispatch(setAlert(error.msg));
        });
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        // const config = {
        //     headers: {
        //         'x-auth-token': localStorage.token,
        //     },
        // };

        const responce = await axios.get(`${URL}/api/auth/me`);

        dispatch({
            type: USER_LOADED,
            payload: responce.data,
        });
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        email,
        password,
    });

    try {
        const response = await axios.post(`${URL}/api/auth`, body, config);

        dispatch({
            type: LOGGIN_SUCCESS,
            payload: response.data,
        });

        dispatch(loadUser());
    } catch (e) {
        const errors = e.response.data.errors;
        errors.forEach((error) => {
            dispatch(setAlert(error.msg));
        });
        dispatch({
            type: LOGGIN_FAIL,
        });
    }
};

// Logout/ Clear
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    dispatch({
        type: CLEAR_PROFILE,
    });
};
