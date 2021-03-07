import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    POST_LOADING,
    UPDATE_LIKES,
} from './types';
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

// Remove post
export const deletePost = (postId) => async (dispatch) => {
    try {
        const url = `${URL}/api/posts/${postId}`;

        await axios.delete(url);
        dispatch({
            type: DELETE_POST,
            payload: postId,
        });
        dispatch(setAlert('Post removed', 'success'));
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

// Add post
export const addPost = (formData) => async (dispatch) => {
    try {
        const url = `${URL}/api/posts/`;
        const body = JSON.stringify({
            text: formData,
        });

        const responce = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({
            type: ADD_POST,
            payload: responce.data.data,
        });
        dispatch(setAlert('Add post', 'success', 1000));
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

export const getPost = (postId) => async (dispatch) => {
    dispatch({
        type: POST_LOADING,
    });

    try {
        console.log('fdsfds');

        const responce = await axios.get(`${URL}/api/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: responce.data.data,
        });
    } catch (e) {
        console.log(e.message);
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
