import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminUsersUpdate = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [data, setData] = useState({
        userName: "",
        email: "",
        phone: ""
    })

    const params = useParams();

    // get single user data
    const getSingleUserData = async() => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            // console.log("Users single data : ", data);
            // console.log(data);
            setData(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleUserData();
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
        console.log(data);

        try {
            const response = await fetch(`${BASE_URL}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });

            const res_data = await response.json();
            
            if (response.ok) {
                toast.success(res_data.message);
                navigate("/admin/users");
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
                <h1>Update User</h1>

                <label>User Name:</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={data.userName}
                    onChange={handleChange}
                />

                <label>Email: </label>
                <input type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                />

                <label>Phone: </label>
                <input type="number"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                />

                <button type="submit">Update</button>
            </form>
        </div>
    </>)
}