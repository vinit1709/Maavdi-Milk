import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Navbar } from "../components/Navbar";
import "../css/Register.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [passShow, setPassShow] = useState(false);

    const { storeTokenInLS, isLoading } = useAuth();

    const passwordShowHideHandler = () => {
        if (passShow === false) {
            setPassShow(true)
        } else {
            setPassShow(false)
        }
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const res_data = await response.json();
        if (response.ok) {
            // stored the token in localhost
            storeTokenInLS(res_data.token);
            toast.success(res_data.message)
            setEmail("")
            setPassword("")
            navigate("/")
            window.location.reload();
        } else {
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    }
    return (<>
        <Navbar />
        <section>
            <div className="form_data login">
                <div className="form_heading">
                    <h1>Log In</h1>
                </div>
                <form onSubmit={loginHandler}>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder='Enter Your Email Address' />
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className="two">
                            <input className="password" type={!passShow ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder='Enter Your password' />
                            <div className='showpass' onClick={() => { passwordShowHideHandler() }}>
                                {passShow === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>
                    <NavLink to="/forgot-password">Forgot Password?</NavLink>
                    <button className='b' type="submit">Login</button>
                    <p>Don't have an Account? Fill <NavLink to="/vendor">Vendor Inquiry</NavLink> Form.</p>
                </form>
            </div>
        </section>
    </>)
}