import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Navbar = () => {
    const { isLoggedIn, user, isLoading } = useAuth();

    const [open, setOpen] = useState(false);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return <>
        <header className="header-had">
            <div className="navbar">
                <img src={`${BASE_URL}/finallogo.png`} alt="logo" />
                <div className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Products</NavLink>
                    <NavLink to="/vendor">Vendor Inquiry</NavLink>
                    <NavLink to="/updates">Updates</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {isLoggedIn ? (
                        <NavLink to="/orders">Order</NavLink>
                    ) : (
                        <></>
                    )}
                    <div className="h-screen">
                        <div style={{ position: "relative" }}>
                            <img onClick={() => setOpen(!open)} src={`${BASE_URL}/user.png`} alt="" style={{ borderRadius: "50px", height: "30px" }} />
                        </div>
                        {
                            open && (
                                <div className="bg-white" style={{ position: "absolute", marginTop: "20px" }}>
                                    {isLoggedIn ? (
                                        user.isAdmin ? (
                                            <>
                                                <div class="sub-menu-wrap" id="submenu">
                                                    <div class="sub-menu">
                                                        <div class="user-info">
                                                            <h3>Hey, {user.userName}</h3>
                                                        </div>
                                                        <hr />
                                                        <NavLink to="/admin/dashboard">
                                                            <p className="lab">Admin</p>
                                                        </NavLink>
                                                        <NavLink to="/logout">
                                                            <p className="lab">Logout</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div class="sub-menu-wrap" id="submenu">
                                                    <div class="sub-menu">
                                                        <div class="user-info">
                                                            <h3>Hey, {user.userName}</h3>
                                                        </div>
                                                        <hr />
                                                        <div className="user-fun">
                                                            <NavLink to="/profile">
                                                                <p className="lab">Profile</p>
                                                            </NavLink>
                                                        </div>
                                                        <NavLink to={`/view-order/${user._id}`}>
                                                            <p className="lab">view order</p>
                                                        </NavLink>
                                                        <NavLink to="/logout">
                                                            <p className="lab">Logout</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <div class="sub-menu-wrap" id="submenu">
                                                <div class="sub-menu">
                                                    <div class="user-info">
                                                        <h3>Hey, User</h3>
                                                    </div>
                                                    <hr />
                                                    <NavLink to="/vendor">
                                                        <p className="lab">Register</p>
                                                    </NavLink>
                                                    <NavLink to="/login">
                                                        <p className="lab">Login</p>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </>)}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    </>
}