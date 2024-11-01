import { useNavigate, useParams } from "react-router-dom";
import "../css/AddProduct.css";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminVendorConfirm = () => {
    const navigate = useNavigate();

    const { authorizationToken } = useAuth();

    const [data, setData] = useState({
        userName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        password: "",
        cpassword: ""
    });

    const params = useParams();

    // get Single Vendor Data
    const getSingleVendorData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/vendors/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            // console.log(data);

            setData({
                userName: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state: data.state,
                pinCode: data.pinCode,
                password: data.phone,
                cpassword: data.phone
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleVendorData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(params.id);

        // console.log(data);
        try {
            // Call both operations concurrently
            const [confirmResponse, registerResponse] = await Promise.all([
                // Confirm vendor request
                fetch(`${BASE_URL}/api/admin/vendors/confirm/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    }
                }),
                // Register vendor
                fetch(`${BASE_URL}/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken, // Include the authorization token if required
                    },
                    body: JSON.stringify(data)
                })
            ]);

            const confirmData = await confirmResponse.json();
            const registerData = await registerResponse.json();

            if (confirmResponse.ok) {
                toast.success(confirmData.message);
                navigate("/admin/vendors");
                if (registerResponse.ok) {
                    toast.success(registerData.message);
                    navigate("/admin/vendors");
                } else {
                    toast.error(registerResponse.extraDetails ? registerResponse.extraDetails : registerResponse.message);
                }
            } else {
                toast.error(confirmData.extraDetails ? confirmData.extraDetails : confirmData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <div style={{ marginTop: "120px" }}>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Confirm Vendor Request</h1>

                <label>User Name:</label>
                <input type="text"
                    value={data.userName} name="userName"
                // onChange={handleChange}
                />

                <label>Email: </label>
                <input type="email"
                    value={data.email} name="email"
                // onChange={handleChange}
                />

                <label>Phone: </label>
                <input type="number" inputMode="numeric"
                    value={data.phone} name="phone"
                // onChange={handleChange}
                />

                <label>Address: </label>
                <input type="text"
                    value={data.address} name="address"
                // onChange={handleChange}
                />

                <label>City: </label>
                <input type="text"
                    value={data.city} name="city"
                // onChange={handleChange}
                />

                <label>State: </label>
                <input type="text"
                    value={data.state} name="state"
                // onChange={handleChange}
                />

                <label>Pin Code: </label>
                <input type="number" inputMode="numeric"
                    value={data.pinCode} name="pinCode"
                // onChange={handleChange}
                />

                <label>Password: set automatically</label>
                <input type="hidden"
                    value={data.phone} name="password"
                // onChange={handleChange}
                />

                <label>Confirm Password: set automatically</label>
                <input type="hidden"
                    value={data.phone} name="cpassword"
                // onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    </>)
}