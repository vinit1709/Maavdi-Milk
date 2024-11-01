import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminTodayUpdatesUpdate = () => {
    const navigate = useNavigate();

    const { authorizationToken } = useAuth();

    const [data, setData] = useState({
        productStatus: "",
        priceStatus: "",
        deliveryStatus: "",
        extraDetails: ""
    });

    const params = useParams();


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    const getSingleTodayUpdatesData = async() => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/today-updates/${params.id}`,{
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            if (response.ok) {
                setData(data);
            } else {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getSingleTodayUpdatesData();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/admin/today-updates/update/${params.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data)
            })
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                navigate("/admin/today-updates");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="update">
                <h1>Update Today Updates</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        id="productStatus"
                        name="productStatus"
                        value={data.productStatus}
                        onChange={handleChange}
                        placeholder="From next month, Taja milk will be packed in 240 grams instead of 250 grams" />

                    <input type="text"
                        id="priceStatus"
                        name="priceStatus"
                        value={data.priceStatus}
                        onChange={handleChange}
                        placeholder="The price of gold milk is going to increase to 40 rupees from next month" />

                    <input type="text"
                        id="deliveryStatus"
                        name="deliveryStatus"
                        value={data.deliveryStatus}
                        onChange={handleChange}
                        placeholder="Today the Delivery from Ingorala to Una road is going to be late" />

                    <input type="text"
                        id="extraDetails"
                        name="extraDetails"
                        value={data.extraDetails}
                        onChange={handleChange}
                        placeholder="extra details" />

                    <button className="sub" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}