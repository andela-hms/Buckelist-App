import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER: 
            console.log(action, 'in Auth user reducer');
            return { ...state, error: '', authenticate: true };
        case UNAUTH_USER:
            return { ...state, authenticate: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case FETCH_MESSAGE: 
            return { ...state, message: action.payload };
    }

    return state;
}