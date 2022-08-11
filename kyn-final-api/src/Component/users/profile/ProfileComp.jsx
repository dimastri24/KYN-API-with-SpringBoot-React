import React, { Component } from 'react'
import './ProfileComp.css'
import { Link } from 'react-router-dom'

export class ProfileComp extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }

    componentDidMount() {
        this.props.currentUser.roles.map(value => {
            console.log(value.name);
        });
        //console.log(role);
    }

    render() {
        return (
            <div>
                <section className="vh-100">
                    <div className="container gradient-custom-3 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-8 mb-4 mb-lg-0">
                                <div className="card mb-3 card-profile">
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-dark pb-2 card-col-border">
                                            {
                                                this.props.currentUser.imageUrl ? (
                                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.userName}
                                                        className="img-fluid my-4 img-profile" />
                                                ) : (
                                                    <div className="text-avatar my-4">
                                                        <span>{this.props.currentUser.userName && this.props.currentUser.userName[0]}</span>
                                                    </div>
                                                )
                                            }
                                            <h5 className="mb-2">{this.props.currentUser.userName}</h5>
                                            {/* <a href="/editprofile" type="button" className="btn btn-info mb-2">Edit Profile</a> */}
                                            <Link to={`/editprofile/${this.props.currentUser.userId}`} className="btn btn-info mb-2">Edit Profile</Link>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-7 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">{this.props.currentUser.email}</p>
                                                    </div>
                                                    <div className="col-5 mb-3">
                                                        <h6>Phone</h6>
                                                        <p className="text-muted">{this.props.currentUser.contactPhone}</p>
                                                    </div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-12">
                                                        <h6>Address</h6>
                                                        <p className="text-muted">{this.props.currentUser.address}</p>
                                                    </div>
                                                </div>
                                            </div>
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

export default ProfileComp