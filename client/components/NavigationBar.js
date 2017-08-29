import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import { addFlashMessage } from '../actions/flashMessagesActions';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.addFlashMessage({
            type: 'success',
            text: 'You have logout successfully!'
        });

    }

    render() {
        const { auth } = this.props;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/allbooks">All Books</Link></li>
                <li><Link to="/user">My Books</Link></li>
                <li><Link to="/addbook">Add New Book</Link></li>
                <li><a href="#" onClick={this.logout}>Log out</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Log in</Link></li>
            </ul>
        );


        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Book trading app</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        {auth.isAuthenticated ? userLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout, addFlashMessage })(NavigationBar);