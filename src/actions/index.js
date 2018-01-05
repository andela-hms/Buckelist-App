import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const API_URL = 'http://127.0.0.1:5000/api/v1.0/';

/**
 * Authenticate user Action
 * 
 * @param {string} token 
 */
export const signUser = (token) => {
    return {
        type: AUTH_USER,
        payload: token
    }
}

/**
 * 
 * @param {string} email - user email
 * @param {string} password - user password 
 */
export const signInUser = ({ email, password }) => {
    return function(dispatch) {
        // Submit email/password to server
        axios.post(`${API_URL}auth/login/`, {email, password})
            .then((response) => {
                // if request is good ...
                // - update state to indicate user is auth
                dispatch(signUser(response.data.auth_token));
                // - save the jwt token
                localStorage.setItem('token', response.data.auth_token);
                // - redirect to route 'feature'
                browserHistory.push('/feature');
            })
            .catch(error =>
                // If request is bad ...
                // - show an error to the user
                dispatch(authError(error)));
    }
}

export function signUpUser({ username, email, password}) {
    return function(dispatch) {
        axios.post(`${API_URL}auth/register/`, {username, email, password})
        .then(response=> {
            // if request is good ...
            // - update state to indicate user is auth
            dispatch( {type: AUTH_USER} );
            // - save the jwt token
            localStorage.setItem('token', response.data.auth_token);
            // - redirect to route 'feature'
            browserHistory.push('/feature');
        })
        .catch(response =>
            // If request is bad ...
            // - show an  error to the user
            dispatch(authError(response.data.message)));        
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function SignOutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER, 
    };
}

/**
 * Get headers
 * 
 * @param {}  
 */

const getHeaders = () => {
    return {
        Authorization: `Token ${localStorage.getItem('token')}`
    };
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(`${API_URL}bucketlists/`, {
        headers: getHeaders()
      })
        .then(response => {
          dispatch({
            type: FETCH_MESSAGE,
            payload: response.data.message
          }).catch((error) => {
              console.log(error);
          });
        });
    }
}
