import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import "../css/AdminProduct.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminUpcomingProducts = () => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [search, setSearch] = useState("");

    const { authorizationToken } = useAuth();

    // get all product data
    const getAllProductData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/upcoming-products`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                setProductData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // delete product click on delete button
    const deleteProduct = async (id) => {
        try {
            const response_delete = await fetch(`${BASE_URL}/api/admin/upcoming-products/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const res_data = await response_delete.json();
            if (response_delete.ok) {
                toast.success(res_data.message);
                getAllProductData();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        getAllProductData();
    }, []);

    const filteredData = productData.filter((curData) => {
        const lowercaseSearch = search.toLowerCase();
        const lowercaseProductName = curData.productName.toLowerCase();
        const lowercaseCategory = curData.productCategory.toLowerCase();
        return lowercaseSearch === '' || lowercaseProductName.includes(lowercaseSearch) || lowercaseCategory.includes(lowercaseSearch);
    })
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className="con">
                <div className="main">
                    <h1>Upcoming Product Details</h1>
                    <div className="submain">
                        <form className="search">
                            <input type="text"
                                id="search"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name" />
                        </form>
                        <button style={{ marginLeft: "20px" }}><Link to="/admin/upcoming-products/add" style={{ color: "#fff" }}>Add Upcoming Product</Link></button>
                    </div>
                    {currentItems.length === 0 ? (
                        <div className="product-box">
                            <label>No Product Found</label>
                        </div>
                    ) : (
                        currentItems.map((curData, index) => {
                                return (
                                    <div className="product-box" key={curData._id}>
                                        <img src={`${BASE_URL}/${curData.productImg}`} alt="Product Image"/>
                                        <div className="product-info">
                                            <div className="details">
                                                <p>Name: {curData.productName}</p>
                                                <p>Category: {curData.productCategory}</p>
                                            </div>
                                            <div className="details">
                                                <p>Packing: {curData.packing}</p>
                                                <p>Shelf Life: {curData.shelfLife}</p>
                                            </div>
                                            <div className="details">
                                                <p>Price: {curData.price} Rs.</p>
                                            </div>
                                            <div className="details">
                                                <p>Description: {curData.description}</p>
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <Link className="but" to={`/admin/upcoming-products/${curData._id}/edit`} style={{ marginBottom: "10px" }}>Edit</Link>
                                            <button className="del" onClick={() => deleteProduct(curData._id)}> Delete</button>
                                        </div>
                                    </div>
                                );
                            })
                    )}
                    <div className="page">
                        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                        <button onClick={nextPage} disabled={currentItems.length < itemsPerPage}>Next</button>
                    </div>
                </div>
            </div>
        </>
    );
};
