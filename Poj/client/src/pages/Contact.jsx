import { useState } from 'react';
import { useAuth } from '../store/auth';
import "../css/Contact.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navbar } from '../components/Navbar';
import { IoLocationOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { Footer } from "../components/Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        message: ''
    });

    const [userData, setUserData] = useState(true);

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (userData && user) {
        setFormData({
            userName: user.userName,
            email: user.email,
            phone: user.phone,
            message: "",
        });

        setUserData(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const res_data = await response.json();
            console.log("res from server", res_data);
            if (response.ok) {
                toast.success(res_data.message);
                setFormData("");
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
            }
        } catch (error) {
            console.log(error);
        }

        setFormData({
            userName: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    return (
        <>
            <Navbar />
            <div className="body">
            <div className="map">
                <div id="map">
                    <div className="map_bind">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.2691528257124!2d71.2057930751106!3d21.22117298047668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be261940dcfa33d%3A0x8155fa31bd55a87e!2sLaxmi%20dairy%20udhyog!5e0!3m2!1sen!2sin!4v1711740838081!5m2!1sen!2sin" width="100%" height="610" style={{ border: "0", frameBorder: "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                </div>
                <div className="map-c">
                    <center>
                        <img src="images/logo.png" height="90px" width="90px" />
                        <h1>Maavdi Milk</h1></center>
                    <div className="det"><IoLocationOutline /> Chalala-Khambha Rd,
                        To:-Ingorala ( bhad ),
                        Amreli, Gujarat, 365635
                        India
                    </div>
                    <div className="det"><FiPhone /> +91 76003 74007</div>
                    <div className="det"><IoIosGlobe /> www.maavdimilk.com</div>
                    <div className="det"><IoMailOutline /> maavdimilk@gmail.com</div>
                </div>
                <div className="cont">
                    <h1>Feedback</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Phone No.:</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <label htmlFor="message">Message:</label>
                        <textarea
                            rows="5"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <br />
                <br />
                <br />
            </div>
            <Footer />
            </div>
        </>
    )
}