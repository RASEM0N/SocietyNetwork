import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    POST_LOADING,
    REMOVE_COMMENT,
    UPDATE_LIKES,
} from '../actions/types';

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
        case GET_POST: {
            return { ...state, post: payload, isLoading: false };
        }
        case POST_ERROR: {
            return { ...state, error: payload, isLoading: false };
        }
        case POST_LOADING: {
            return { ...state, isLoading: true };
        }
        case UPDATE_LIKES: {
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.postId
                        ? { ...post, likes: payload.likes }
                        : post
                ),
                isLoading: false,
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
            };
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, payload],
                isLoading: false,
            };
        }
        case ADD_COMMENT: {
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: payload,
                    isLoading: false,
                },
            };
        }

        case REMOVE_COMMENT: {
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: payload,
                    isLoading: false,
                },
            };
        }
        default: {
            return state;
        }
    }
}
export default Post;
