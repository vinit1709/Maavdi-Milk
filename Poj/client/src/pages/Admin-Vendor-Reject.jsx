import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminVendorReject = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [data, setData] = useState({
        vendorRejectReason: ""
    });

    const params = useParams();

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response_reject = await fetch(`${BASE_URL}/api/admin/vendors/reject/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data)
            });

            const res_data = await response_reject.json();

            if (response_reject.ok) {
                toast.success(res_data.message);
                navigate("/admin/vendors")
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div style={{ marginTop: "120px" }}>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Vendore Reject </h1>
                <label>Reject Reason:</label>
                <textarea
                    rows="3" cols="50"
                    type="text"
                    id="vendorRejectReason"
                    name="vendorRejectReason"
                    value={data.vendorRejectReason}
                    onChange={handleChange}
                    placeholder="Please enter the reason for rejecting the vendor request."
                />
                <button type="submit">Reject Rquest</button>
            </form>
        </div>
        </>
    )
}