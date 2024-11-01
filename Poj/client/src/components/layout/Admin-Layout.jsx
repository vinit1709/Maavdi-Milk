import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";
import { BiSolidCategory, BiSolidMessage } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { RiDashboard2Fill, RiDashboard2Line } from "react-icons/ri";
import { GrSystem, GrUpdate } from "react-icons/gr";
import { LuBoxes } from "react-icons/lu";
import { PiTruckDuotone } from "react-icons/pi";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./AdminLayout.css";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    // console.log("admin Layout:",user);
    const [isActive, setIsActive] = useState(false);

    const toggleDropdown = () => {
        setIsActive(!isActive);
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!user.isAdmin) {
        toast.error("You are not an Admin..!!")
        return <Navigate to="/" />;
    }

    return <>
        <div className="top">
            <h2>Welcome, {user ? user.userName : "User" } </h2>
            <label><GrSystem /> <NavLink to="/admin/system" style={{ color: "#fff",marginLeft:"10px", fontSize: "1.2rem"}}> System</NavLink></label>
        </div>
        <div className="sidebar">
            <h2>
                <img src={`${BASE_URL}/logo1.png`} alt="logo"
                    style={{ borderRadius: "50%" }} /> <br />
                Maavdi milk</h2>
            <ul>
            <NavLink to="/">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <FaHome />
                        </div>
                        <label>Home</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/dashboard">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <RiDashboard2Line />
                        </div>
                        <label>Dashboard</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/users">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <FaUser />
                        </div> <label>Users</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/contacts">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <BiSolidMessage />
                        </div>
                        <label>Contacts</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/products">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <LuBoxes />
                        </div>
                        <label>Products</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/categorys">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <BiSolidCategory />
                        </div>
                        <label>Category</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/vendors">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <FaUserPlus />
                        </div>
                        <label>Vendor</label>
                    </li>
                </NavLink>
                <NavLink className={`dropdown-btn ${isActive ? 'active' : ''}`} onClick={toggleDropdown}>
                    <li class="dropdown-btn">
                        <div style={{ fontSize: "25px" }}>
                            <GrUpdate />
                        </div>
                        <label>Updates</label> <label style={{ marginLeft: "70px", fontSize: "25px" }}><IoMdArrowDropdown /></label>
                    </li>
                    <div class="dropdown-container" style={{ display: isActive ? 'block' : 'none' }}>
                        <NavLink to="/admin/today-updates">
                            <li>
                                <div style={{ fontSize: "25px" }}>
                                    <HiOutlineSpeakerphone />
                                </div>
                                <label>Today Update</label>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/upcoming-products">
                            <li>
                                <div style={{ fontSize: "25px" }}>
                                    <FaBoxOpen />
                                </div>
                                <label>Upcoming Product</label>
                            </li>
                        </NavLink>
                    </div>
                </NavLink>
                <NavLink to="/admin/orders">
                    <li>
                        <div style={{ fontSize: "25px" }}>
                            <PiTruckDuotone />
                        </div>
                        <label>Order</label>
                    </li>
                </NavLink>
            </ul>
        </div>
        <Outlet />
    </>
};