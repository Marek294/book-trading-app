import React from 'react';
import { connect } from 'react-redux';

import { searchBooks, addBook } from '../../actions/booksActions';

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            books: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.searchBooks(this.state.searchString).then((res) => {
            this.setState({
                books: res.data.items
            })
        });
    }

    addBook(saveBook) {
        this.props.addBook(saveBook).then(res => {
            this.setState({
                searchString: '',
                books: []
            });
        })
    }

    render() {
        const showBooks = this.state.books.map((book,index) => {
            const saveBook = {
                book_id: book.id,
                title: book.volumeInfo.title,
                authors: '',
                image_thumbnail: ''

            };

            if(book.volumeInfo.imageLinks) saveBook.image_thumbnail = book.volumeInfo.imageLinks.thumbnail;

            let showAuthors;
            if(book.volumeInfo.authors) {
                saveBook.authors = book.volumeInfo.authors;
                showAuthors = book.volumeInfo.authors.map((author,index) => {
                    return <h6 key={index} >{author}</h6>
                });
            }
            return (
                <div key={index} className="col-xs-4">
                    <div className="thumbnail">
                        {book.volumeInfo.imageLinks ? <img className="img-thumbnail" src={book.volumeInfo.imageLinks.thumbnail} /> : <img className="img-thumbnail" src="/img/no_book_cover.jpg" />}
                        <h5><b>{book.volumeInfo.title}</b></h5>
                        {showAuthors}
                        <button className="btn btn-lg btn-primary" onClick={this.addBook.bind(this,saveBook)}>Add book</button>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <h1>Search for Books!</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input name="searchString" type="text" className="form-control" placeholder="Search for books" onChange={this.onChange} value={this.state.searchString}/>
                    </div>
                    <button className="btn btn-primary">Search</button>
                </form>
                <div className="row jumbotron equal">
                    {showBooks}
                </div>
            </div>
        );
    }
}

AddBook.propTypes = {
    searchBooks: React.PropTypes.func.isRequired,
    addBook: React.PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
    return {
        searchBooks: (searchString) => dispatch(searchBooks(searchString)),
        addBook: (saveBook) => dispatch(addBook(saveBook))
    }
}

export default connect(null, mapDispatchToProps)(AddBook);