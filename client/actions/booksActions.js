import axios from 'axios';
import { BOOK_BORROWED, SAVE_ALL_BOOKS, SAVE_MY_BOOKS, DELETE_BOOK } from './types';

export function bookBorrowed(book_id) {
    return {
        type: BOOK_BORROWED,
        book_id
    }
}

export function deleteBook(book_id) {
    return {
        type: DELETE_BOOK,
        book_id
    }
}

export function saveAllBooks(allBooks) {
    return {
        type: SAVE_ALL_BOOKS,
        allBooks
    }
}

export function saveMyBooks(myBooks) {
    return {
        type: SAVE_MY_BOOKS,
        myBooks
    }
}

export function searchBooks(value) {
    return dispatch => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`);
    }
}

export function getAllBooks() {
    return dispatch => {
        return axios.get('/api/books/all').then(res => {
            return dispatch(saveAllBooks(res.data.books));
        });
    }
}

export function getUserBooks() {
    return dispatch => {
        return axios.get('/api/books/user').then(res => {
            return dispatch(saveMyBooks(res.data.books));
        });
    }
}

export function addBook(book) {
    return dispatch => {
        return axios.post('/api/books/',book);
    }
}

export function deleteUserBook(id) {
    return dispatch => {
        return axios.delete(`/api/books/${id}`).then(res => {
            return dispatch(deleteBook(id));
        });
    }
}