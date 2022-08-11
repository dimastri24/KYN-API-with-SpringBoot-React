import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../../../service/KYNService';
import Alert from 'react-s-alert';
import './Signup.css'

export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

export class Signup extends Component {
    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div>
                <section className=" bg-image pic-bg">
                    <div className="mask d-flex align-items-center  gradient-custom-3">
                        <div className="container ">
                            <div className="row d-flex justify-content-center align-items-center ">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card car-border" >
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                            <SocialSignup />
                                            <div className="divider d-flex align-items-center my-4">
                                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                            </div>

                                            <SignupForm />

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                                                className="fw-bold text-body"><u>Login here</u></Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

//Social SignUp form 
class SocialSignup extends Component {
    render() {
        return (
            <div className="d-grid gap-2">
                <a className="btn btn-primary btn-lg fb-color" href={FACEBOOK_AUTH_URL}>
                    <i className="bi bi-facebook me-2"></i> Continue with Facebook</a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
            .then(response => {
                Alert.success("You're successfully registered. Please login to continue!");
                this.props.history.push("/login");
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div className="form-outline mb-4">
                    <input type="text" id="form3Example1cg" className="form-control form-control-lg"
                        name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
                    <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg"
                        name="email" value={this.state.email} onChange={this.handleInputChange} required />
                    <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg"
                        name="password" value={this.state.password} onChange={this.handleInputChange} required />
                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                    <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

            </form>
        )
    }
}

export default Signup