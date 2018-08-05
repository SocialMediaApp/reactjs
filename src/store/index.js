import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
  auth
});

const configureStore = initialState => createStoreWithMiddleware(reducer, initialState);

export default configureStore;