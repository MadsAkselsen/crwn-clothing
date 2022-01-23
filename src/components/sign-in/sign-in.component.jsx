import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';
import {
    googleSignInStart,
    emailSignInStart,
} from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and passwprd</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="email"
                        required
                    />

                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required
                    ></FormInput>
                    {/* we have to set the below google button to type button, else it will make a submit event due to being part of a form */}
                    {/* If the google button fires submit event it will submit the whole form and the username and password field, which we dont want here
                    since we're signing in with google */}
                    <div className="buttons">
                        <CustomButton type="submit">Submit Form</CustomButton>
                        <CustomButton
                            type="button"
                            onClick={googleSignInStart}
                            isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart(email, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
