import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    /* state по умолчанию, мы могли задать его в самих reducer, но уже для каждого */
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
