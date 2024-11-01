import { NavLink, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../css/ProductDetails.css";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const ProductDetails = () => {
    const [productData, setProductData] = useState([]);

    const params = useParams();


    const getAllProductData = async () => {
        // console.log(params.id);
        try {
            const response = await fetch(`${BASE_URL}/api/data/product/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            if (response.status === 200) {
                setProductData([data]);
                // console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProductData();
    }, []);
    return (
        <>
            <Navbar />
            <main className="container">
                {productData == null ? "" :
                    productData.map((product) => {
                        return (
                            <>
                                <div className="left-column">
                                    <img src={`${BASE_URL}/${product.productImg}`} alt="Product Image" />
                                </div>
                                <div className="right-column">
                                    <div className="product-description">
                                        <span>{product.productCategory}</span>
                                        <h1>{product.productName}</h1>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className="product-configuration">
                                        <div className="cable-config">
                                            <span>Product Quantity</span>
                                            <div className="cable-choose">
                                                <button>{product.packing.join(', ')}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <NavLink to="/orders" className="cart-btn">{product.price} Rs.</NavLink>
                                    </div>
                                </div>
                            </>)
                    })
                }
            </main>
            </>
            )
}