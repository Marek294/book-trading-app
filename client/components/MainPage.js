import React from 'react';
import { connect } from 'react-redux';

import Greetings from './Greetings';
import MyBooks from './books/MyBooks';

class MainPage extends React.Component {
    render() {
        const { auth } = this.props;
        return (
            <div>
                { auth.isAuthenticated ? this.context.router.push('/user') : <Greetings /> }
            </div>
        );
    }
}

MainPage.propTypes = {
    auth: React.PropTypes.object.isRequired
};

MainPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(MainPage);