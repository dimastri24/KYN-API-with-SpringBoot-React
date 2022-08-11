import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import errorImg from '../../img/error404.png'

export class NotFound extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={errorImg} alt="imgerror" />
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <Link className="btn btn-primary" to="/">Go Home</Link>
            </div>
        )
    }
}

export default NotFound