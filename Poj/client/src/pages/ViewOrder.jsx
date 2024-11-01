import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ViewOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState('userName'); // Default search by userName
    const [dateSearch, setDateSearch] = useState('orderDate');
    const params = useParams();

    const getOrderData = async() => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/view-order/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setOrderData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderData();
    }, []);

    return(
        <>
            <Navbar />
            <div className="main">
            <h1>View Order</h1>
                <div className="filter-container">
                    {/* <div className="status-filter">
                        <label htmlFor="status">Filter Data: </label>
                        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                            <option value="userName">Name</option>
                            <option value="orderDate">Order Date</option>
                            <option value="deliveryDate">Delivery Date</option>
                        </select>
                    </div> */}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Product Name</th>
                            <th>Packing</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.length === 0 ? (
                            <tr>
                                <td colSpan="9" style={{ fontSize: "1.2rem", fontWeight: "800" }}>No Order Found</td>
                            </tr>
                        ) : (
                            orderData.map((curData, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan={curData.orders.length + 1}>{index + 1}</td>
                                        <td rowSpan={curData.orders.length + 1}>{curData.orderDate}</td>
                                        <td rowSpan={curData.orders.length + 1}>{curData.deliveryDate}</td>
                                    </tr>
                                    {curData.orders.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.productName}</td>
                                            <td>{data.packing}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.totalPrice}</td>
                                        </tr>
                                    ))}
                                    <tr style={{ background: "lightgray", fontWeight: "500" }}>
                                        <td colSpan="5">Grand Total</td>
                                        <td colSpan="3">{curData.grandTotal}</td>
                                    </tr>
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    )
}