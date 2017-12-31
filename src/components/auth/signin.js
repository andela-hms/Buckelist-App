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

class Signin extends Component {

    render () {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
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
                {this._renderAlert()}
                <button action="submit" className="btn btn-primary"> Sign in </button>
            </Form>
        );
    }

    _handleFormSubmit({ email, password }) {
        console.log(email, password);
        this.props.SignInUser({email, password})
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

// export default reduxForm({
//     form: 'Signin',
//     fields: ['email', 'password']
// }, null, actions) (Signin);

function mapStateToProps(state) {
    return { form: state.form, errorMessage: state.auth.error };
}

Signin = connect(mapStateToProps, actions)(Signin);
Signin = reduxForm({
 form: 'signin'
})(Signin);
export default Signin;
