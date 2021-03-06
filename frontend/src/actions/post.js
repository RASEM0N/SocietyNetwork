import { GET_POSTS, POST_ERROR, POST_LOADING, UPDATE_LIKES } from './types';
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

// Add like
export const addLike = (postId) => async (dispatch) => {
    try {
        const url = `${URL}/api/posts/like/${postId}`;

        const responce = await axios.put(url);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId,
                likes: responce.data.data.likes,
            },
        });
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status,
            },
        });
    }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
    try {
        const url = `${URL}/api/posts/unlike/${postId}`;

        const responce = await axios.put(url);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId,
                likes: responce.data.data.likes,
            },
        });
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status,
            },
        });
    }
};
