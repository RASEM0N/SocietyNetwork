import axios from 'axios';

import { setAlert } from './alert';
import { URL } from '../config/config';
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const responce = await axios.get(`${URL}/api/profile/me`);

        dispatch({
            type: GET_PROFILE,
            payload: responce.data.data,
        });
    } catch (e) {
        console.log(e.message);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status,
            },
        });
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const response = await axios.post(`${URL}/api/profile`, formData, {
            headers: {
                'Content-type': 'application/json',
            },
        });

        dispatch({
            type: GET_PROFILE,
            payload: response.data.data,
        });

        dispatch(
            setAlert(edit ? 'Profile Update' : 'Profile created', 'success')
        );

        history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
            dispatch(setAlert(error.msg));
        });
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const response = await axios.put(
            `${URL}/api/profile/experience`,
            formData,
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data,
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg));
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const response = await axios.put(
            `${URL}/api/profile/education`,
            formData,
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data,
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg));
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `${URL}/api/profile/experience/${id}`
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data,
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response,
                status: error.response,
            },
        });
    }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `${URL}/api/profile/education/${id}`
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data,
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response,
                status: error.response,
            },
        });
    }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    try {
        const response = await axios.delete(`${URL}/api/profile/`);

        dispatch({
            type: CLEAR_PROFILE,
        });
        dispatch({
            type: ACCOUNT_DELETED,
        });
        dispatch(
            setAlert(
                'Your account has been permanantly deleted',
                'success',
                10000
            )
        );
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response,
                status: error.response,
            },
        });
    }
};
