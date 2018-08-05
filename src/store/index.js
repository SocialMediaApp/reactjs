import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import newsfeed from './newsfeed';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
  auth,
  newsfeed
});

const configureStore = initialState => createStoreWithMiddleware(reducer, initialState);

export default configureStore;