import { GET_POSTS, POST_ERROR, POST_LOADING } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import { URL } from '../config/config';

export const getPosts = () => async (dispatch) => {
    dispatch({
        type: POST_LOADING,
    });

    try {
        const responce = await axios.get(`${URL}/api/posts`);

        dispatch({
            type: GET_POSTS,
            payload: responce.data.data,
        });
    } catch (e) {
        const errors = e.response.data.errors;
        if (errors !== undefined) {
            console.log(errors);
            errors.forEach((error) => {
                dispatch(setAlert(error.msg));
            });
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status,
            },
        });
    }
};
