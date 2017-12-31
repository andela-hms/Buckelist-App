import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" />
        </div>
    );
}

class SignUp extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <Form>
                <div className="form-group">
                    <label> Username: </label>
                    <Field name="username" 
                        type="text" component={renderInput} />
                </div>

                <div className="form-group">
                    <label> Email: </label>
                    <Field name="email" 
                        type="email" component={renderInput} />
                </div>

                <div className="form-group">
                    <label> Password: </label>
                    <Field name="password" 
                        type="password" component={renderInput} />
                </div>
                 
                <div className="form-group">
                    <label> Retype Password: </label>
                    <Field name="retypePassword" 
                        type="password" component={renderInput} />
                </div>

                <button action="submit" className="btn btn-primary"> Sign up </button>
            </Form> 
        );
    }

    _handleFormSubmit({ username, email, password, retypePassword }) {
        console.log(email, password);
        this.props.SignInUser({email, password})
    }
}

function validate(formProps) {
    const errors = {};
    if (formProps.password !== formProps.retypePassword) {
        errors.password = 'Passwords must match';
    }
    console.log(formProps);

    return errors;
}

const form = reduxForm({ form: 'signup', validate });
export default connect(null, actions)(form(SignUp));
