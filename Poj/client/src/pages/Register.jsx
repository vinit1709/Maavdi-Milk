import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../css/Register.css";
import { Navbar } from "../components/Navbar";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Register = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    // const [userNameError, setUserNameError] = useState("")
    // const [emailError, setEmailError] = useState("")
    // const [phoneError, setPhoneError] = useState("")
    // const [passwordError, setPasswordError] = useState("")
    // const [cPasswordError, setCpasswordError] = useState("")

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    // const [selectedIndex, setSekectedIndex] = useState("");

    const { storeTokenInLS } = useAuth();

    const passwordShowHideHandler = () => {
        if (passShow == false) {
            setPassShow(true)
        } else {
            setPassShow(false)
        }
    }

    const cPasswordShowHideHandler = () => {
        if (cpassShow == false) {
            setCPassShow(true)
        } else {
            setCPassShow(false)
        }
    }

    const RegisterHandler = async(e) => {
        e.preventDefault();
        let submit = true

        // if (selectedIndex === "") {
        //     // name validation
        //     if (userName === "") {
        //         setUserNameError("Please Enter Name")
        //         submit = false
        //     } else {
        //         setUserNameError("")
        //         submit = true
        //     }
        //     // email validation
        //     if (email === "") {
        //         setEmailError("Please Enter Email address")
        //         submit = false
        //     } else if (!email.includes("@")) {
        //         setEmailError("Please Enter Valid Email address")
        //         submit = false
        //     } else {
        //         setEmailError("")
        //         submit = true
        //     }
        //     // phone validation
        //     if (phone === "") {
        //         setPhoneError("Please Enter Phone no")
        //         submit = false
        //     } else if (phone.length < 10) {
        //         setPhoneError("Please Enter Valid Phone no")
        //         submit = false
        //     } else if (phone.length > 10) {
        //         setPhoneError("Please Enter Valid Phone no")
        //         submit = false
        //     } else if (phone.length === 10) {
        //         setPhoneError("")
        //         submit = true
        //     }
        //     // password validation
        //     // if (password === "") {
        //     //     setPasswordError("Please Enter Password")
        //     //     submit = false
        //     // }else if (password.length < 8) {
        //     //     setPasswordError("Please Enter minimum 8 Character")
        //     //     submit = false
        //     // }else {
        //     //     setPasswordError("")
        //     //     submit = true
        //     // }
        //     // // Confirm password validation
        //     // if (cpassword === "") {
        //     //     setCpasswordError("Please Enter Confirm Password")
        //     //     submit = false
        //     // } else if (cpassword.length < 8) {
        //     //     setCpasswordError("Please Enter minimum 8 Character")
        //     //     submit = false
        //     // } else {
        //     //     setCpasswordError("")
        //     //     submit = true
        //     // }
        //     // if (password !== cpassword) {
        //     //     setCpasswordError("Password and Confirm Password not match")
        //     //     submit = false
        //     // }
        // }

        // Create User
        if (submit === true) {
            
            // console.log(userName, email, phone, password, cpassword);
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName, email, phone, password, cpassword
                })
            });

            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);
            if (response.ok) {
                
                // stored the token in localhost
                storeTokenInLS(res_data.token);
                toast.success(res_data.message)
                setUserName("")
                setEmail("")
                setPhone("")
                setPassword("")
                setCpassword("")
                navigate("/login")
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } else {
            console.log("false");
        }
    }

    return (<>
        <Navbar />
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Register</h1>
                </div>

                <form>
                    <div className="form_input">
                        <label htmlFor="userName">User Name</label>
                        <input type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName} name="userName"
                            placeholder='Enter Your Name' />
                    </div>
                    {/* <div style={{ color: "red" }}>{userNameError}</div> */}

                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email" placeholder='Enter Your Email Address' />
                    </div>
                    {/* <div style={{ color: "red" }}>{emailError}</div> */}

                    <div className="form_input">
                        <label htmlFor="phone">Phone</label>
                        <input type="number" inputMode="numeric" pattern="[0-9]{10}"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            name="phone" placeholder='Enter Your Phone No' />
                    </div>
                    {/* <div style={{ color: "red" }}>{phoneError}</div> */}

                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className="two">
                            <input className="password" type={!passShow ? "password" : "text"}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name="password" placeholder='Enter Your Password' />
                            <div className='showpass' onClick={() => { passwordShowHideHandler() }}>
                                {passShow === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>
                    {/* <div style={{ color: "red" }}>{passwordError}</div> */}

                    <div className="form_input">
                        <label htmlFor="password">Confirm Password</label>
                        <div className="two">
                            <input className="password" type={!cpassShow ? "password" : "text"}
                                onChange={(e) => setCpassword(e.target.value)}
                                value={cpassword}
                                name="cpassword" id="cpassword" placeholder='Confirm password' />
                            <div className='showpass' onClick={() => { cPasswordShowHideHandler() }}>
                                {cpassShow === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>
                    {/* <div style={{ color: "red" }}>{cPasswordError}</div> */}

                    <button className='b' onClick={RegisterHandler} >Register Now</button>
                    <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                </form>

            </div>
        </section>
    </>)
}