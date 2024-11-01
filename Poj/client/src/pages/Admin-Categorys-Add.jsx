import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminCategorysAdd = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [data, setData] = useState({
        categoryName: ""
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(data);

        try {
            const response = await fetch(`${BASE_URL}/api/admin/categorys/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data)
            })

            const res_data = await response.json();
            // console.log(res_data);
            
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
        <div style={{ marginTop: "120px" }}>
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
                <button type="submit">Add Category</button>
            </form>
        </div>
    </>)
};