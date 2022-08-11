import React, { Component } from 'react'
import './Login.css'
import Alert from 'react-s-alert';
import { login } from '../../../service/KYNService';
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const ACCESS_TOKEN = 'accessToken';

export class Login extends Component {

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="girl with phone" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2 className="mb-3 text-center">Login</h2>

                            <LoginForm />

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <SocialLogin />

                            <div className="d-flex align-items-center justify-content-center my-4">
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <Link className="btn btn-outline-danger" to="/signup">Create new!</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

//Social Login Form
class SocialLogin extends Component {
    render() {
        return (
            <div className="d-grid gap-2">
                <a className="btn btn-primary btn-lg fb-color" href={FACEBOOK_AUTH_URL}>
                    <i className="bi bi-facebook me-2"></i> Continue with Facebook</a>
            </div>
        );
    }
}

//Local LoginForm
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
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
        //console.log(inputName)
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                Alert.success("You're successfully logged in!");
                this.props.history.push("/profile");
                // <Redirect to={{
                //     pathname: "/",
                //     state: { from: this.props.location }
                // }} />
            }).catch(error => {
                Alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-outline form-floating mb-4">
                    <input type="email" id="form1Example13" className="form-control form-control-lg" name="email"
                        value={this.state.email} onChange={this.handleInputChange} required />
                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>

                <div className="form-outline form-floating mb-4">
                    <input type="password" id="form1Example23" className="form-control form-control-lg" name="password"
                        value={this.state.password} onChange={this.handleInputChange} required />
                    <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg" type="submit">Sign in</button>
                </div>
            </form>

        );
    }
}

export default withRouter(Login);