import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminOrdersUpdate = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modifiedQuantities, setModifiedQuantities] = useState({});
    const [newData, setNewData] = useState(null); // State to hold updated data

    const params = useParams();

    const getSingleOrderData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/orders/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                setOrderData(data);
                // Initialize modifiedQuantities with default quantities
                const initialQuantities = {};
                data.orders.forEach((order, index) => {
                    initialQuantities[index] = order.quantity;
                });
                setModifiedQuantities(initialQuantities);
            }

            // console.log(orderData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    useEffect(() => {
        getSingleOrderData();
    }, []);

    useEffect(() => {
        console.log(orderData);
    }, [orderData]);

    const handleQuantityChange = (index, newValue) => {
        setModifiedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [index]: newValue
        }));
    };

    const handleSubmit = async() => {
        // Prepare updated data with modified quantities
        const updatedData = {
            ...orderData,
            orders: orderData.orders.map((order, index) => ({
                ...order,
                quantity: modifiedQuantities[index]
            }))
        };
        // Set the updated data to be displayed
        setNewData(updatedData);
        
        console.log(updatedData);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="update">
                <h1>Admin Orders Update</h1>
                {orderData && (
                    <div>
                        <label>User Name: {orderData.userName}</label>
                        <hr />
                        {/* Render orders */}
                        <div>
                            {/* <h2>Orders:</h2> */}
                            {orderData.orders.map((order, index) => (
                                <div key={index}>
                                    <label>Product Name: {order.productName}</label>
                                    <label>Packing: {order.packing}</label>
                                    {/* Render Quantity field as input for all orders */}
                                    <label style={{ display: "flex", alignItems: "center"}}>
                                        Quantity:
                                        <input
                                            type="text"
                                            value={modifiedQuantities[index]}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        />
                                    </label>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={handleSubmit}>Update</button>
            </div>
            {/* Display updated data */}
            {newData && (
                <div>
                    <h2>Updated Data:</h2>
                </div>
            )}
        </>
    );
};

