import React, { Component } from 'react'
import img1 from '../../img/home-banner-1.jpg'
import img2 from '../../img/home-banner-2.jpg'
import img3 from '../../img/home-banner-3.jpg'
import { Link, NavLink } from 'react-router-dom';
import './HomeComp.css'

export class HomeComp extends Component {
    render() {
        return (
            <div>
                <main>
                    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="bg mx-auto d-block" src={img1} alt="img1"></img>

                                <div className="container">
                                    <div className="carousel-caption text-start heading">
                                        <h1>Welcome to our website!!</h1>
                                        <p>Hurry Sign Up now to see what's been up to date in your location.</p>
                                        <p><NavLink className="btn btn-lg btn-primary" to="/signup">SIGN UP</NavLink></p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="bg mx-auto d-block" src={img2} alt="img2"></img>

                                <div className="container">
                                    <div className="carousel-caption heading">
                                        <h1>Interest about us?.</h1>
                                        <p>We here will help you finding the best stores around you.</p>
                                        <p><Link className="btn btn-lg btn-primary" to="/aboutus">Learn more</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="bg mx-auto d-block" src={img3} alt="img3"></img>

                                <div className="container">
                                    <div className="carousel-caption text-end heading">
                                        <h1>Just contact us.</h1>
                                        <p>Available weekdays to help your queries.</p>
                                        <p><Link className="btn btn-lg btn-primary" to="/contactus">Learn more</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </main>
            </div>
        )
    }
}

export default HomeComp