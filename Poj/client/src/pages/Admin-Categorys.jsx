import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import "../css/AdminUser.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminCategorys = () => {
    const [categoryData, setCategoryData] = useState([]);

    const { authorizationToken } = useAuth();

    // get category data
    const getAllCategorysData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/categorys`, {
                method: "GET",  
                headers: {
                    Authorization: authorizationToken,
                },
            })

            const data = await response.json();
            // console.log("Categorys", data);

            if (response.ok) {
                setCategoryData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete the contact on delete button
    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/categorys/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success(res_data.message);
                getAllCategorysData();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategorysData();
    }, []);

    return (
        <>
            <div className="con">
                <div className="main">
                    <h1>Category Details</h1>
                    <div className="submain">
                        <button><Link to="/admin/categorys/add" style={{ color: "#fff" }}>Add Category</Link></button>
                    </div>
                    <table>

                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>

                        {categoryData.length === 0 ? (
                        <tr>
                            <td colSpan="4">No category found</td>
                        </tr>
                    ): (
                        categoryData.map((curCategoryData, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{curCategoryData.categoryName}</td>
                                <td> <Link className="but" to={`/admin/categorys/${curCategoryData._id}/edit`}>Edit</Link></td>
                                <td><button className="del" onClick={() => deleteCategory(curCategoryData._id)}> Delete</button></td>
                            </tr>
                        })
                    )}
                    </table>

                </div>
            </div>
        </>)
};