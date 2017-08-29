import { BOOK_BORROWED, SAVE_ALL_BOOKS, SAVE_MY_BOOKS, DELETE_BOOK } from '../actions/types';
import findIndex from 'lodash/findIndex';

const initialState = {
    allBooks: [],
    myBooks: [],
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SAVE_ALL_BOOKS:
            return {
                allBooks: action.allBooks
            };
        case BOOK_BORROWED: {
            const index = findIndex(state.allBooks, { id: action.book_id });
            var allBooks = state.allBooks;

            allBooks.splice(index,1);

            if(index >= 0) {
                return {
                    allBooks: allBooks
                }
            }
            else return state;
        }
        case SAVE_MY_BOOKS:
            return {
                myBooks: action.myBooks
            };
        case DELETE_BOOK: {
            const index = findIndex(state.myBooks, { id: action.book_id });
            var myBooks = state.myBooks;

            myBooks.splice(index,1);

            if(index >= 0) {
                return {
                    myBooks: myBooks
                }
            }
            else return state;
        }
        default: return state;
    }
}