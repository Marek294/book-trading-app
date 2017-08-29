import React from 'react';
import { connect } from 'react-redux';

import { getMyRequests, getRequestsToYou, deleteMyRequest, deleteToYouRequest, updateMyRequest, updateToYouRequest } from '../../actions/requestsActions';
import { getAllBooks } from '../../actions/booksActions';

class RequestNavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            requestsToYouNumber: 0,
            requestsToYou: [],
            myRequestsNumber: 0,
            myRequests: [],
            myTradeRequests: false,
            tradeRequestsToYou: false,
        }

    }

    componentWillMount() {
        this.props.getMyRequests();
        this.props.getRequestsToYou();
    }

    componentWillReceiveProps(nextProps) {
        // if(nextProps.requests.myRequests) {
        //     this.setState({
        //         myRequests: nextProps.requests.myRequests,
        //         myRequestsNumber: nextProps.requests.myRequests.length,
        //     })
        // }
        // if(nextProps.requests.requestsToYou){
        //     this.setState({
        //         requestsToYou: nextProps.requests.requestsToYou,
        //         requestsToYouNumber: nextProps.requests.requestsToYou.length,
        //     })
        // }
        this.setState({
            myRequests: nextProps.requests.myRequests,
            myRequestsNumber: nextProps.requests.myRequests.length,

            requestsToYou: nextProps.requests.requestsToYou,
            requestsToYouNumber: nextProps.requests.requestsToYou.length,
        })
    }

    yourTradeClick() {
        this.setState({
            myTradeRequests: !this.state.myTradeRequests,
            tradeRequestsToYou: false
        });
    }

    tradesToYouClick() {
        this.setState({
            tradeRequestsToYou: !this.state.tradeRequestsToYou,
            myTradeRequests: false
        });
    }

    deleteMyRequest(request_id) {
        this.props.deleteMyRequest(request_id).then(() => {
            this.props.getAllBooks();
        });
    }

    deleteToYouRequest(request_id) {
        this.props.deleteToYouRequest(request_id).then(() => {
            this.props.getAllBooks();
        });
    }

    outRequest(request_id) {
        var body = {
            id: request_id,
            status: 'return'
        }
        this.props.updateMyRequest(body);
    }

    acceptRequest(request_id) {
        var body = {
            id: request_id,
            status: 'up'
        }
        this.props.updateToYouRequest(body);
    }

    render() {
        var requests;
        if(this.state.myTradeRequests) {
            requests = this.state.myRequests.map((request,index) => {
                return <li key={index} className="list-group-item text-left">
                            <div className="parent">
                                <div className="col-md-11">
                                    <p>Title: <b>{request.book_title}</b></p>
                                    <div className="fontSize">
                                        <p className="request-inf">to {request.seller_username}</p>
                                        <p className="request-inf">status: {request.status}</p>
                                    </div>
                                </div>
                                <div className="col-md-1 inner">
                                    {request.status == 'pending' ? <button className="btn btn-link" onClick={() => this.deleteMyRequest(request.id)}><i className="fa fa-minus-circle deleteIcon" aria-hidden="true"></i></button> : null }
                                    {request.status == 'up' ? <button className="btn btn-link" onClick={() => this.outRequest(request.id)}><i className="fa fa-sign-out outIcon" aria-hidden="true"></i></button> : null }
                                </div>
                            </div>
                        </li>
            })
        }

        if(this.state.tradeRequestsToYou) {
            requests = this.state.requestsToYou.map((request,index) => {
                return <li key={index} className="list-group-item text-left">
                    <div className="parent">
                        <div className="col-md-11">
                            <p>Title: <b>{request.book_title}</b></p>
                            <div className="fontSize">
                                <p className="request-inf">to {request.seller_username}</p>
                                <p className="request-inf">status: {request.status}</p>
                            </div>
                        </div>
                        <div className="col-md-1 inner">
                            {request.status == 'return' ? <button className="btn btn-link" onClick={() => this.deleteToYouRequest(request.id)}><i className="fa fa-minus-circle deleteIcon" aria-hidden="true"></i></button> : null }
                            {request.status == 'pending' ?
                                <div>
                                <button className="btn btn-link" onClick={() => this.acceptRequest(request.id)}><i className="fa fa-check outIcon" aria-hidden="true"></i></button>
                                <button className="btn btn-link" onClick={() => this.deleteToYouRequest(request.id)}><i className="fa fa-minus-circle deleteIcon" aria-hidden="true"></i></button>
                                </div> : null }
                        </div>
                    </div>
                </li>
            })
        }

        return (
            <div>
                <div className="col-md-offset-1">
                    <ul className="nav nav-pills">
                        <li role="presentation" className={this.state.myTradeRequests ? "active" : null} onClick={() => this.yourTradeClick()}><a href="#">Your trade requests <span className="badge">{this.state.myRequestsNumber}</span></a></li>
                        <li role="presentation" className={this.state.tradeRequestsToYou ? "active" : null} onClick={() => this.tradesToYouClick()}><a href="#">Trade requests for you<span className="badge">{this.state.requestsToYouNumber}</span></a></li>
                    </ul>
                </div>
                <div>
                    <ul className="list-group trade-margin">
                        {requests}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        requests: state.requests
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getMyRequests: () => dispatch(getMyRequests()),
        getRequestsToYou: () => dispatch(getRequestsToYou()),
        deleteMyRequest: (request_id) => dispatch(deleteMyRequest(request_id)),
        deleteToYouRequest: (request_id) => dispatch(deleteToYouRequest(request_id)),
        getAllBooks: () => dispatch(getAllBooks()),
        updateMyRequest: (body) => dispatch(updateMyRequest(body)),
        updateToYouRequest: (body) => dispatch(updateToYouRequest(body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestNavigationBar);