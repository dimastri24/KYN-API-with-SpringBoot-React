import React, { Component } from 'react'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { Route, Switch } from 'react-router-dom';
import LoadingIndicator from '../Component/template/LoadingIndicator';
import HeaderComp from '../Component/template/HeaderComp';
import FooterComp from '../Component/template/FooterComp'
import HomeComp from '../Component/home/HomeComp'
import PrivateRoute from './PrivateRoute'
import ProfileComp from '../Component/users/profile/ProfileComp'
import { getCurrentUser } from '../service/KYNService'
import Login from '../Component/users/login/Login'
import Signup from '../Component/users/signup/Signup'
import StoresComp from '../Component/stores/StoresComp'
import SearchByKeyComp from '../Component/stores/SearchByKeyComp'
import StoreDetail from '../Component/stores/StoreDetail'
import OAuth2RedirectHandler from '../Component/users/oauth2/OAuth2RedirectHandler';
import NotFound from '../Component/template/NotFound'
import EditProfileComp from '../Component/users/profile/EditProfileComp'

export const ACCESS_TOKEN = 'accessToken';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />
        }

        return (
            <div>
                <div>
                    <HeaderComp authenticated={this.state.authenticated} onLogout={this.handleLogout} currentUser={this.state.currentUser} />
                </div>
                <div>
                    <Switch>
                        <Route exact path="/" component={HomeComp}></Route>
                        <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                            component={ProfileComp}></PrivateRoute>
                        <PrivateRoute path="/editprofile/:userid" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                            component={EditProfileComp}></PrivateRoute>
                        <PrivateRoute path="/stores" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                            component={StoresComp}></PrivateRoute>
                        <PrivateRoute path="/search/:keyword" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                            component={SearchByKeyComp}></PrivateRoute>
                        <PrivateRoute path="/store/:storeid" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                            component={StoreDetail}></PrivateRoute>
                        <Route path="/login"
                            render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/signup"
                            render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
                <div>
                    <FooterComp />
                </div>
                <Alert stack={{ limit: 3 }}
                    timeout={15000}
                    position='top-right' effect='slide' offset={65} />
            </div>
        )
    }
}

export default App;