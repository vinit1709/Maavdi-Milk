import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const AdminTodayUpdates = () => {
    const [todayUpdatesData, setTodayUpdatesData] = useState([]);

    const { authorizationToken } = useAuth();


    // get all today updates in reverse form
    const getAllTodayUpdatesData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/today-updates`, {
                method: "GET",
                headers: {
                    Authorization : authorizationToken
                },
            });
            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                setTodayUpdatesData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete today updates data
    const deleteCategory = async(id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/today-updates/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success(res_data.message);
                getAllTodayUpdatesData();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTodayUpdatesData();
    }, []);

    return (
        <>
            <div className="con">
                <div className="main">
                    <h1>Today Updates</h1>
                    <div className="submain">
                        <button><Link to="/admin/today-updates/add" style={{ color: "#fff" }}>Add Today Updates</Link></button>
                    </div>
                    <table>

                        <tr>
                            <th>No.</th>
                            <th>Product Status</th>
                            <th>Price Status</th>
                            <th>Delivery Status</th>
                            <th>Extra Details</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>

                        {todayUpdatesData.length === 0 ? (
                        <tr>
                            <td colSpan="7">No Today Updates found</td>
                        </tr>
                    ) : (
                        todayUpdatesData.map((curData, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{curData.productStatus}</td>
                                <td>{curData.priceStatus}</td>
                                <td>{curData.deliveryStatus}</td>
                                <td>{curData.extraDetails}</td>
                                <td> <Link className="but" to={`/admin/today-updates/${curData._id}/edit`}>Edit</Link></td>
                                <td><button className="del" onClick={() => deleteCategory(curData._id)}> Delete</button></td>
                            </tr>
                        })
                    )}
                    </table>

                </div>
            </div>
        </>
    )
}