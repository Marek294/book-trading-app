import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import AllBooks from './components/books/AllBooks';
import MyBooks from './components/books/MyBooks';
import MainPage from './components/MainPage';
import AddBook from './components/books/AddBook';
import UserPage from './components/UserPage';

import requireAuth from './utils/requireAuth';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={MainPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user" component={requireAuth(UserPage)} >
            <IndexRoute component={MyBooks} />
            <Route path="/allbooks" component={AllBooks} />
            <Route path="/addbook" component={AddBook} />
        </Route>
    </Route>
)