import React, { useState } from "react";
import "../css/Vendor.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Vendor = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        address: '',
        pinCode: '',
        serviceRequest: ''
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/form/vendor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                setData("");
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message );
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />
            <center><img className="img" src="./images/Add_a_heading.gif" /></center>
            <div className="header">
                <h2 style={{ textAlign: "center", color: "#ffffff" }}>Vender Inquiry Form</h2>
            </div>
            <div>
                <div className="jumbotron">
                    <div className="content">
                        <form className="form-horizontal" onSubmit={handleSubmit}>
                            <div className="form-group"></div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="name">Name:</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} placeholder="Enter Name" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                                <div className="col-sm-12">
                                    <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter Email" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label className="control-label col-sm-5" htmlFor="phone">Phone:</label>
                                <div className="col-sm-12">
                                    <input type="number" className="form-control" id="phone" name="phone" value={data.phone} onChange={handleChange} placeholder="Enter Phone Number" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label className="control-label col-sm-5" htmlFor="state">State:</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" id="state" name="state" value={data.state} onChange={handleChange} placeholder="Enter State" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label className="control-label col-sm-5" htmlFor="city">City:</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" id="city" name="city" value={data.city} onChange={handleChange} placeholder="Enter City" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label className="control-label col-sm-5" htmlFor="address">Street Address:</label>
                                <div className="col-sm-12">
                                    <textarea type="text" className="form-control" id="address" name="address" value={data.address} onChange={handleChange} placeholder="Enter Address" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label className="control-label col-sm-5" htmlFor="pinCode">Pin Code:</label>
                                <div className="col-sm-12">
                                    <input type="number" inputMode="numeric" className="form-control" id="pinCode" name="pinCode" value={data.pinCode} onChange={handleChange} placeholder="Enter Pin Code Number" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <label htmlFor="serviceRequest">Requested Service/Comments:</label>
                                <textarea type="text" className="col-sm-12 form-control" rows="3" id="serviceRequest" name="serviceRequest" value={data.serviceRequest} onChange={handleChange} placeholder="Enter Your Message" />
                            </div><br />
                            <div className="radio">
                                <label><input type="checkbox" name="optradio" /> I Agree  all Rules</label>
                            </div><br />
                            <div className="form-group">
                                <div className="col-sm-12 col-sm-8">
                                    <center><button type="submit" className="b btn-outline-primary">Submit</button></center><br /><br /><br /><br /><br />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}