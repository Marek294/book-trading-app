import React from 'react'
import { connect } from 'react-redux';

import RequestNavigationBar from './requests/RequestNavigationBar';

class UserPage extends React.Component {
    render() {
        return (
            <div className="jumbotron text-center">
                <div className="row">
                    <RequestNavigationBar />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UserPage;