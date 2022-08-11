import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

class HeaderComp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
                    <div className="container-xl">
                        <Link to="/" className="navbar-brand">KYN</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {
                            this.props.authenticated ? (
                                <div className="collapse navbar-collapse" id="navbarsExample07XL">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/stores">Stores</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/aboutus">About Us</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/contactus">Contact Us</NavLink>
                                        </li>
                                    </ul><ul className="navbar-nav mb-2 mb-lg-0">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown"
                                                aria-expanded="false">{this.props.currentUser.userName}</a>
                                            <ul className="dropdown-menu" aria-labelledby="dropdown07XL">
                                                <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/terms">Terms Condition</NavLink></li>
                                                <li><a className="dropdown-item" onClick={this.props.onLogout}>LOGOUT</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="collapse navbar-collapse" id="navbarsExample07XL">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/aboutus">About Us</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName="active" to="/contactus">Contact Us</NavLink>
                                        </li>
                                    </ul>
                                    <div className="text-end">
                                        <NavLink className="btn btn-outline-light me-2" to="/login">Login</NavLink>
                                        <NavLink className="btn btn-outline-light me-2" to="/signup">Sign-up</NavLink>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </div>
        )
    }
}

export default HeaderComp;