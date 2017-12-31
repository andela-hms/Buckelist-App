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
            <Form onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
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
                { this._renderAlert() }
                <button action="submit" className="btn btn-primary"> Sign up </button>
            </Form> 
        );
    }

    _handleFormSubmit(formProps) {
        // call action creator to sign up the user
        this.props.signUpUser(formProps);
    }

    _renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { form: state.form, errorMessage: state.auth.error };
}

function validate(formProps) {
    const errors = {};
    if (formProps.password !== formProps.retypePassword) {
        errors.password = 'Passwords must match';
    }
    console.log(formProps);

    return errors;
}

const signUpForm = reduxForm({ form: 'signup', validate });
export default connect(mapStateToProps, actions)(signUpForm(SignUp));
