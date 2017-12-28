import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const API_URL = 'http://127.0.0.1:5000/api/v1.0/';

export function SignInUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password to server
        axios.post(`${API_URL}auth/login/`, {email, password})
            .then(response=> {
                // if request is good ...
                // - update state to indicate user is auth
                dispatch( {type: AUTH_USER} );
                // - save the jwt token
                localStorage.setItem('token', response.data.auth_token);
                // - redirect to route 'feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                // If request is bad ...
                // - show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
