import axios from 'axios';
import { URL } from '../config/config';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { setAlert } from './alert';

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

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        });
    } catch (e) {
        setAlert(e.message);
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};
