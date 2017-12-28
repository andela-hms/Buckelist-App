import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
    render () {
        const { handleSubmit, fields: { email, password }} = this.props;
        return (
            <form onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label> Email: </label>
                    <input {...email} className="form-control"/>
                </fieldset>

                <fieldset className="form-group">
                    <label> Password: </label>
                    <input {...password} className="form-control"/>
                </fieldset>
                <button action="submit" className="btn btn-primary"> Sign in </button>
            </form>
        );
    }

    _handleFormSubmit({ email, password }) {
        console.log(email, password);
    }
}

export default reduxForm({
    form: 'Signin',
    fields: ['email', 'password']
}) (Signin);