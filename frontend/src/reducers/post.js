import { GET_POSTS, POST_ERROR, POST_LOADING } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    isLoading: true,
    error: {},
};

function Post(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS: {
            return { ...state, posts: payload, isLoading: false };
        }
        case POST_ERROR: {
            return { ...state, error: payload, isLoading: false };
        }
        case POST_LOADING: {
            return { ...state, isLoading: true };
        }

        default: {
            return state;
        }
    }
}
export default Post;
