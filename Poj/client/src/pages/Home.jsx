import React from "react";
import "../css/Home.css";
import "../css/Bootstrap.min.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NavLink } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <Navbar />
            {/* Hero Start */}
            <div className="hero">
                <div className="content">
                    <h1 className="p1">Explore More</h1>
                    <p className="p2">Welcome to Maavdi Milk, your trusted source for premium quality dairy products! We are dedicated to providing you with the freshest and most nutritious milk and dairy products straight from our farm to your table.</p>
                    <NavLink to="/product">Show More</NavLink>
                </div>
                <video src="./images/Bgvideo.mp4" playsInline autoPlay muted loop className="background-clip"></video>
            </div>
            {/* Hero End */}

            <div className="container-fluid fruite py-3" >
                <div className="container">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-12 text-center">
                                <h1 className="text-align-center">Our Products</h1>
                            </div>
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item" style={{ zIndex: "-1"}}>
                                                        <div className="fruite-img">
                                                            <img src="./images/Super-gold.png" className="img-fluid w-100 rounded-top"
                                                                alt="" />
                                                        </div>
                                                        <div className="p-4 border border-maavdi border-top-0 rounded-bottom">
                                                            <h4>Super Gold Milk</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item" style={{ zIndex: "-1"}}>
                                                        <div className="fruite-img">
                                                            <img src="./images/chash.jpg" className="img-fluid w-100 rounded-top"
                                                                alt="" />
                                                        </div>
                                                        <div className="p-4 border border-maavdi border-top-0 rounded-bottom">
                                                            <h4>Butter Milk</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item" style={{ zIndex: "-1"}}>
                                                        <div className="fruite-img">
                                                            <img src="./images/taja.jpg" className="img-fluid w-100 rounded-top"
                                                                alt="" />
                                                        </div>
                                                        <div className="p-4 border border-maavdi border-top-0 rounded-bottom">
                                                            <h4>Taja Milk</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item" style={{ zIndex: "-1"}}>
                                                        <div className="fruite-img">
                                                            <img src="./images/khatamitha.jpg" className="img-fluid w-100 rounded-top"
                                                                alt="" />
                                                        </div>
                                                        <div className="p-4 border border-maavdi border-top-0 rounded-bottom">
                                                            <h4>Butter Milk</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}