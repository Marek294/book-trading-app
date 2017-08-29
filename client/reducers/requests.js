import { SAVE_MY_REQUESTS, SAVE_REQUEST, DELETE_MY_REQUEST, DELETE_TO_YOU_REQUEST, PUT_MY_REQUEST, PUT_TO_YOU_REQUEST, SAVE_REQUEST_TO_YOU } from '../actions/types';
import findIndex from 'lodash/findIndex';

const initialState = {
    myRequests: [],
    requestsToYou: []
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SAVE_MY_REQUESTS:
            return {
                ...state,
                myRequests: action.myRequests
             };
        case SAVE_REQUEST_TO_YOU:
            return {
                ...state,
                requestsToYou: action.requestsToYou
            };
        case SAVE_REQUEST: {
            let requests = state.myRequests;

            requests.push(action.request);

            return {
                ...state,
                myRequests: requests
            };
        }
        case PUT_MY_REQUEST: {
            const index = findIndex(state.myRequests, { id: action.request.id });
            let putRequests = state.myRequests;

            putRequests[index].status = action.request.status;

            return {
                ...state,
                myRequests: putRequests
            };
        }
        case PUT_TO_YOU_REQUEST: {
            const index = findIndex(state.requestsToYou, { id: action.request.id });
            let putRequests = state.requestsToYou;

            putRequests[index].status = action.request.status;

            return {
                ...state,
                requestsToYou: putRequests
            };
        }
        case DELETE_MY_REQUEST: {
            const index = findIndex(state.myRequests, { id: action.request_id });
            let myRequests = state.myRequests;

            myRequests.splice(index,1);

            if(index >= 0) {
                return {
                    ...state,
                    myRequests: myRequests
                }
            }
            else return state;
        }
        case DELETE_TO_YOU_REQUEST: {
            const index = findIndex(state.requestsToYou, { id: action.request_id });
            let requestsToYou = state.requestsToYou;

            requestsToYou.splice(index,1);

            if(index >= 0) {
                return {
                    ...state,
                    requestsToYou: requestsToYou
                }
            }
            else return state;
        }
        default: return state;
    }
}