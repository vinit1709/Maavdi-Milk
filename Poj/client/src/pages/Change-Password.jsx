import { useState } from "react";
import "../css/Profile.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const ChangePassword = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, isLoading } = useAuth();
    
    const [data, setData] = useState({
        password: '',
        newPassword: '',
        newConfimPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/auth/passwordUpdate/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success(res_data.message);
                navigate("/profile");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}> 
                <div className="cont light-style flex-grow-1 container-p-y">
                    <div className="card overflow-hidden">
                        <div className="row no-gutters row-bordered row-border-light">
                            <div className="col-md-3 pt-0">
                                <div className="list-group list-group-flush account-settings-links">
                                    <a
                                        className="list-group-item list-group-item-action"
                                        data-toggle="list"
                                        href="/profile">Profile</a>
                                    <a className="list-group-item list-group-item-action active"
                                        data-toggle="list"
                                        href="/change-password">Change
                                        password</a>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="tab-content">
                                    <div className="tab-pane fade active show"
                                        id="account-change-password">
                                        <div className="card-body pb-2">
                                            <div className="form-group">
                                                <label className="form-label">Current
                                                    password</label>
                                                <input type="text"
                                                    className="form-control" 
                                                    id="password"
                                                    name="password"
                                                    value={data.password}
                                                    onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">New
                                                    password</label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="newPassword"
                                                    name="newPassword"
                                                    value={data.newPassword}
                                                    onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Repeat new
                                                    password</label>
                                                <input type="text"
                                                    className="form-control" 
                                                    id="newConfimPassword"
                                                    name="newConfimPassword"
                                                    value={data.newConfimPassword}
                                                    onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <label>
                                    if u don't remember your current password &nbsp;
                                    <NavLink to="/forgot-password" >forgot password?</NavLink>
                                </label>
                            </div>
                            <div className="d-flex justify-content-end mb-3">
                                <button className="btn btn-primary" type="submit" >Save changes</button>
                                <NavLink className="but" to="/profile" >Back</NavLink>&nbsp; &nbsp; &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}