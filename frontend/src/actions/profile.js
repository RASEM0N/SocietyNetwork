import axios from 'axios';

import { setAlert } from './alert';
import { URL } from '../config/config';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const responce = await axios.get(`${URL}/api/profile/me`);

        dispatch({
            type: GET_PROFILE,
            payload: responce.data,
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

        dispatch(setAlert(edit ? 'Profile Update' : 'Profile created'));

        if (!edit) {
            history.push('/dashboard');
        }
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
