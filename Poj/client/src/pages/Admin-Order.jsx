import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { IoIosSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/AdminOrder.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState('userName'); // Default search by userName
    const [dateSearch, setDateSearch] = useState('orderDate');

    const { authorizationToken } = useAuth();

    const getAllOrderData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/orders`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })

            const data = await response.json();

            if (response.ok) {
                setOrderData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteOrder = async(id) => {
        // console.log(id);
        try {
            const response = await fetch(`${BASE_URL}/api/admin/orders/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                getAllOrderData();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        getAllOrderData();
    }, []);

    const filteredData = orderData.filter((curData) => {
        const lowercaseSearch = search.toLowerCase();
        const lowercaseValue = curData[searchBy].toLowerCase();
        const lowercaseDateSearch = dateSearch.toLowerCase();
        if (dateSearch === 'orderDate' || dateSearch === 'deliveryDate') {
            // Check if the date field matches the search text
            return lowercaseValue.includes(lowercaseSearch);
        } else {
            // Check if the other fields match the search text
            return lowercaseSearch === '' ? curData : lowercaseValue.includes(lowercaseSearch);
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="con">
            <div className="main">
                <h1>Order Details</h1>
                <div className="filter-container">
                    <form className="search">
                        <input type="text"
                            id="search"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Search by ${searchBy}`} />
                    </form>
                    <div className="status-filter">
                        <label htmlFor="status">Filter Data: </label>
                        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                            <option value="userName">Name</option>
                            <option value="orderDate">Order Date</option>
                            <option value="deliveryDate">Delivery Date</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Vendor Name</th>
                            <th>Product Name</th>
                            <th>Packing</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="9" style={{ fontSize: "1.2rem", fontWeight: "800" }}>No Order Found</td>
                            </tr>
                        ) : (
                            currentItems.map((curData, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan={curData.orders.length + 1}>{indexOfFirstItem + index + 1}</td>
                                        <td rowSpan={curData.orders.length + 1}>{curData.orderDate}</td>
                                        <td rowSpan={curData.orders.length + 1}>{curData.deliveryDate}</td>
                                        <td rowSpan={curData.orders.length + 1}>{curData.userName}</td>
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
                                        <td className="editdelete">
                                            {/* <NavLink className="but" to={`/admin/orders/${curData._id}/edit`}>Edit</NavLink> */}
                                            <button className="del" onClick={() => handleDeleteOrder(curData._id)}>Delete</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="page">
                    <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                    <button onClick={nextPage} disabled={currentItems.length < itemsPerPage}>Next</button>
                </div>
            </div>
        </div>
    );
};
