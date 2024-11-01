import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import "../css/AdminUser.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminUsers = () => {
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");

    const { authorizationToken } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            // console.log("Users",response);
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete the user on delete button
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                getAllUsersData();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <div className="con">
                <div className="main">
                    <h1>Register Users</h1>
                    <form className="search">
                        <input type="text"
                            id="search"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name" />
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No users found</td>
                                </tr>
                            ) : (
                                user.filter((curUserData) => {
                                    const lowercaseSearch = search.toLowerCase();
                                    const lowercaseUserName = curUserData.userName.toLowerCase();
                                    return lowercaseSearch === '' ? curUserData : lowercaseUserName.includes(lowercaseSearch);
                                }).map((curUserData, index) => {
                                    return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{curUserData.userName}</td>
                                        <td>{curUserData.email}</td>
                                        <td>{curUserData.phone}</td>
                                        <td> <Link className="but" to={`/admin/users/${curUserData._id}/edit`}>Edit</Link></td>
                                        <td><button className="del" onClick={() => deleteUser(curUserData._id)}> Delete</button></td>
                                    </tr>)
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
};