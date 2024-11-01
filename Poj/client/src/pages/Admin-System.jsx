import { FaBoxOpen, FaUser, FaUserPlus } from "react-icons/fa"
import "../css/AdminSystem.css";
import { NavLink } from "react-router-dom";
import { BiSolidCategory, BiSolidMessage } from "react-icons/bi";
import { LuBoxes } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import { PiTruckDuotone } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { RiDashboard2Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminSystem = () => {

    return (
        <>
            <div className="con">
                <div className="main">
                    <h1>Manage System</h1>
                    {/* View Dashboard */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <TbReportAnalytics /> <label>Reports</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/report">Generate PDF</NavLink>
                    </div>

                    {/* View Dashboard */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <RiDashboard2Line /> <label>Dashboard</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/dashboard">View Dashboard</NavLink>
                    </div>

                    {/* Manage Users */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <FaUser /> <label>Users</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/users">Manage Users</NavLink>
                    </div>

                    {/* Manage Contacts */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <BiSolidMessage /> <label>Contacts</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/contacts">Manage Contacts</NavLink>
                    </div>

                    {/* Manage Products */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <LuBoxes /> <label>Products</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/products/add">Add Products</NavLink>
                        <NavLink className="but" to="/admin/products">Manage Products</NavLink>
                    </div>

                    {/* Manage Category */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <BiSolidCategory /> <label>Category</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/categorys/add">Add Category</NavLink>
                        <NavLink className="but" to="/admin/categorys">Manage Category</NavLink>
                    </div>

                    {/* Manage Vendor */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <FaUserPlus /> <label>Vendor</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/vendors">Manage Vendor</NavLink>
                    </div>

                    {/* Manage Today Updates */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <GrUpdate /> <label>Updates</label> </p>
                        <div className="hr"></div>
                    </div>
                    <label> <HiOutlineSpeakerphone /> Today Updates</label>
                    <hr />
                    <div>
                        <NavLink className="but" to="/admin/today-updates/add">Add Today Updates</NavLink>
                        <NavLink className="but" to="/admin/today-updates">Manage Today Updates</NavLink>
                    </div>
                    <br />
                    <label> <FaBoxOpen /> Upcoming Products</label>
                    <hr />
                    <div>
                        <NavLink className="but" to="/admin/upcoming-products/add">Add Upcoming Products</NavLink>
                        <NavLink className="but" to="/admin/upcoming-products">Manage Upcoming Products</NavLink>
                    </div>

                    {/* Manage Orders */}
                    <div className="manage">
                        <div className="hr1"></div>
                        <p> <PiTruckDuotone /> <label>Orders</label> </p>
                        <div className="hr"></div>
                    </div>
                    <div>
                        <NavLink className="but" to="/admin/orders">Manage Orders</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}