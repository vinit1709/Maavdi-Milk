import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Navbar } from "../components/Navbar";
import "../css/Register.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [password, setPassword] = useState("")
    const [enteredOTP, setEnteredOTP] = useState("");

    const [passShow, setPassShow] = useState(false);

    const passwordShowHideHandler = () => {
        if (passShow === false) {
            setPassShow(true)
        } else {
            setPassShow(false)
        }
    }

    const { storeTokenInLS, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const handleChange = (index, value) => {
        if (!isNaN(value) && value !== '') {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            if (index < 5 && value !== '') {
                // Auto focus to the next input if it's not the last input
                document.getElementById(`digit${index + 1}`).focus();
            }

            // Update entered OTP
            const updatedEnteredOTP = newOTP.join('');
            setEnteredOTP(updatedEnteredOTP);

        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            // Move focus to the previous input and delete its value
            const newOTP = [...otp];
            newOTP[index - 1] = '';
            setOTP(newOTP);
            document.getElementById(`digit${index - 1}`).focus();
        }
    };

    const handleSubmit = () => {
        // const enteredOTP = otp.join('');
        console.log(enteredOTP);
        setOTP(['', '', '', '', '', '']); // Clear OTP inputs
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })

        const res_data = await response.json();
        if (response.ok) {
            // stored the token in localhost
            storeTokenInLS(res_data.token);
            toast.success(res_data.message);
        } else {
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    }

    const Handler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                otp: enteredOTP,
                password
            })
        })

        const res_data = await response.json();
        if (response.ok) {
            // stored the token in localhost
            storeTokenInLS(res_data.token);
            toast.success(res_data.message)
            setPassword("")
            navigate("/")
        } else {
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    }
    return (<>
        <Navbar />
        <section id="forgotPassword">
            <div className="form_data login">
                <div className="form_heading">
                    <h1>Forgot Password</h1>
                </div>
                <form onSubmit={loginHandler}>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder='Enter Your Email Address' />
                    </div>
                    <button className='b' type="submit">Send</button>
                </form>
            </div>
        </section>
        <section id="otp">
            <div className="form_data login">
                <div className="form_heading">
                    {/* <h1>Forgot Password</h1> */}
                    <img src="./images/Secure.png" alt="logo" style={{ zIndex : "1", height: "auto", width: "200px"}}/>
                </div>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ color: '#333', marginBottom: '30px', fontSize: '28px' }}>Enter Four Digit OTP</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`digit${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    textAlign: 'center',
                                    margin: '0 5px',
                                    fontSize: '20px',
                                    borderRadius: '5px',
                                    outline: 'none',
                                }}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            fontSize: '16px',
                        }}
                    >
                        Submit
                    </button>
                    {error && <p style={{ color: 'red', marginTop: '20px', fontSize: '16px' }}>{error}</p>}
                </div>
            </div>
        </section>
        <section id="resetPassword">
            <div className="form_data login">
                <div className="form_heading">
                    <h1>Reset Password</h1>
                </div>
                <form onSubmit={Handler}>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className="two">
                            <input className="password" type={!passShow ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder='Enter Your password' />
                            <div className='showpass' onClick={() => { passwordShowHideHandler() }}>
                                {passShow === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>
                    <button className='b' type="submit">Update</button>
                </form>
            </div>
        </section>
    </>)
}