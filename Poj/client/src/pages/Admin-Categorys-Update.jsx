import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminCategorysUpdate = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [data, setData] = useState({
        categoryName: ""
    });

    const params = useParams();
    
    // get single category data
    const getSingleCategoryData = async() => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/categorys/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })

            const data = await response.json();
            // console.log(data);
            setData(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleCategoryData();
    }, []);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    // to update the data daynamically
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/admin/categorys/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data)
            })

            const res_data = await response.json();
            // console.log(res_data.message);

            if (response.ok) {
                toast.success(res_data.message);
                navigate("/admin/categorys");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
            <div style={{ marginTop: "20px" }}>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Add Category</h1>
                <label>Category Name:</label>
                <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    value={data.categoryName}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    </>)
}