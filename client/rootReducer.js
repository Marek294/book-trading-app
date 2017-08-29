import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import requests from './reducers/requests';
import books from './reducers/books';

export default combineReducers({
    flashMessages,
    auth,
    requests,
    books,
});