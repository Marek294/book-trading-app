import React from 'react';
import { connect } from 'react-redux';

import { getAllBooks, bookBorrowed } from '../../actions/booksActions';

import { borrowBook } from '../../actions/requestsActions';

class AllBooks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            user: this.props.auth.user
        };

        this.borrowBook = this.borrowBook.bind(this);
    }

    componentWillMount() {
        this.props.getAllBooks();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            books: nextProps.books.allBooks,
        })
    }

    borrowBook(book_id) {
        this.props.borrowBook(book_id);
        this.props.bookBorrowed(book_id);
    }

    render() {
        const showBooks = this.state.books.map((book,index) => {
            const authors = book.authors.substring(2,book.authors.length-2).split('","');
            const showAuthors = authors.map((author,index) => {
                return <h6 key={index}>{author}</h6>
            });
            return (
                <div key={index} className="col-xs-4">
                    <div className="thumbnail">
                        {book.image_thumbnail ? <img className="img-thumbnail" src={book.image_thumbnail} /> : <img className="img-thumbnail" src="/img/no_book_cover.jpg" />}
                        <h5><b>{book.title}</b></h5>
                        {showAuthors}
                        { this.state.user.id != book.user_id ? <button className="btn btn-success" onClick={() => this.borrowBook(book.id)}>Borrow this book</button> : null }
                    </div>
                </div>
            );
        });

        return (
            <div>
                <h1>All Books!</h1>
                <div className="row jumbotron equal">
                    {showBooks}
                </div>
            </div>
        );
    }
}

AllBooks.propTypes = {
    getAllBooks: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        auth: state.auth,
        books: state.books
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllBooks: () => dispatch(getAllBooks()),
        borrowBook: (book_id) => dispatch(borrowBook(book_id)),
        bookBorrowed: (book_id) => dispatch(bookBorrowed(book_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);