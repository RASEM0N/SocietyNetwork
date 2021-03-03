import axios from 'axios';

import { setAlert } from './alert';
import { URL } from '../config/config';
import { GET_PROFILE, PROFILE_ERROR } from './types';

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
