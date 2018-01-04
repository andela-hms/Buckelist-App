import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { signInUser } from '../../actions';
import { bindActionCreators } from 'redux';
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
    constructor(props) {
        super(props);
    }

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
        this.props.signInUser({email, password})
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    signInUser
}, dispatch)

Signin = connect(mapStateToProps, mapDispatchToProps)(Signin);
Signin = reduxForm({
 form: 'signin'
})(Signin);

export default Signin;
