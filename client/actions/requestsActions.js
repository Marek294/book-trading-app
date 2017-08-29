import axios from 'axios';
import { SAVE_MY_REQUESTS, SAVE_REQUEST, DELETE_MY_REQUEST, DELETE_TO_YOU_REQUEST, PUT_MY_REQUEST, PUT_TO_YOU_REQUEST, SAVE_REQUEST_TO_YOU } from './types';

export function saveMyRequests(myRequests) {
    return {
        type: SAVE_MY_REQUESTS,
        myRequests
    }
}

export function saveRequestsToYou(requestsToYou) {
    return {
        type: SAVE_REQUEST_TO_YOU,
        requestsToYou
    }
}

export function saveRequest(request) {
    return {
        type: SAVE_REQUEST,
        request
    }
}

export function putMyRequest(request) {
    return {
        type: PUT_MY_REQUEST,
        request
    }
}

export function putToYouRequest(request) {
    return {
        type: PUT_TO_YOU_REQUEST,
        request
    }
}

export function deleteMyRequestFromStore(request_id) {
    return {
        type: DELETE_MY_REQUEST,
        request_id
    }
}

export function deleteToYouRequestFromStore(request_id) {
    return {
        type: DELETE_TO_YOU_REQUEST,
        request_id
    }
}

export function updateMyRequest(body) {
    return dispatch => {
        return axios.put('/api/requests/',body).then(res => {
            return dispatch(putMyRequest(res.data));
        })
    }
}

export function updateToYouRequest(body) {
    return dispatch => {
        return axios.put('/api/requests/',body).then(res => {
            return dispatch(putToYouRequest(res.data));
        })
    }
}

export function getMyRequests() {
    return dispatch => {
        return axios.get('api/requests/myRequests').then(res => {
            return dispatch(saveMyRequests(res.data))
        });
    }
}

export function borrowBook(book_id) {
    const post = { book_id: book_id };
    return dispatch => {
        return axios.post('/api/requests/',post).then(res => {
            return dispatch(saveRequest(res.data));
        });
    }
}

export function getRequestsToYou() {
    return dispatch => {
        return axios.get('/api/requests/requestsToYou').then(res => {
            return dispatch(saveRequestsToYou(res.data));
        });
    }
}

export function deleteMyRequest(request_id) {
    return dispatch => {
        return axios.delete(`/api/requests/${request_id}`).then(res => {
            return dispatch(deleteMyRequestFromStore(request_id));
        });
    }
}

export function deleteToYouRequest(request_id) {
    return dispatch => {
        return axios.delete(`/api/requests/${request_id}`).then(res => {
            return dispatch(deleteToYouRequestFromStore(request_id));
        });
    }
}