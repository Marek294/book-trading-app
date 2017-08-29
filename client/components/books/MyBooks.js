import React from 'react';
import { connect } from 'react-redux';

import { getUserBooks, deleteUserBook } from '../../actions/booksActions';

class MyBooks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        }
    }

    componentWillMount() {
        this.props.getUserBooks();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            books: nextProps.books.myBooks,
        })
    }

    deleteBook(id){
        this.props.deleteUserBook(id);
    }

    render() {
        const showBooks = this.state.books.map((book, index) => {
            const authors = book.authors.substring(2,book.authors.length-2).split('","');
            const showAuthors = authors.map((author,index) => {
                return <h6 key={index} >{author}</h6>
            });
            return (
                <div key={index} className="col-xs-4">
                    <div className="thumbnail">
                        {book.image_thumbnail ? <img className="img-thumbnail" src={book.image_thumbnail} /> : <img className="img-thumbnail" src="/img/no_book_cover.jpg" />}
                        <h5><b>{book.title}</b></h5>
                        {showAuthors}
                        <button className="btn btn-lg btn-danger" onClick={this.deleteBook.bind(this,book.id,index)}>Delete book</button>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <h1>My Books!</h1>
                <div className="row jumbotron equal">
                    {showBooks}
                </div>
            </div>
        );
    }
}

MyBooks.propTypes = {
    getUserBooks: React.PropTypes.func.isRequired,
    deleteUserBook: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        books: state.books
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getUserBooks: () => dispatch(getUserBooks()),
        deleteUserBook: (id) => dispatch(deleteUserBook(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);