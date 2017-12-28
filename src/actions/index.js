import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1.0/';

export function SignInUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password to server
        axios.post(`${API_URL}auth/login/`, {email, password});

        // if request is good ...
        // - update state to indicate user is auth
        // - save the jwt token
        // - redirect to route 'feature'

        // If request is bad ...
        // - show an error to the user
    }
}
