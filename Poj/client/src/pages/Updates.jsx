import { Navbar } from "../components/Navbar";
import "../css/Updates.css";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Updates = () => {
    const [data, setData] = useState([]);
    const [todayUpdate, setTodayUpdate] = useState([]);

    const getLatestTodayUpdates = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/update/today-updates/latest`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res_data = await response.json();
            // console.log(res_data);
            if (response.ok) {
                setTodayUpdate([res_data]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getLatestUpcomingProduct = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/update/upcoming-products/latest`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res_data = await response.json();
            if (response.ok) {
                setData([res_data]);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getLatestTodayUpdates();
    }, []);

    useEffect(() => {
        getLatestUpcomingProduct();
    }, []);
    return (
        <>
            <Navbar />
            <h1>Today Updates</h1>
            <div>
                {todayUpdate.length === 0 ? (
                    <div className="detail">
                    <ul>
                        <li>No Today Updates found</li>
                    </ul>
                </div>
                    ) : (
                        todayUpdate.map((curData) => {
                        return (
                            <div className="detail">
                                <ul>
                                    <li>{curData.productStatus}</li>
                                    <li>{curData.priceStatus}</li>
                                    <li>{curData.deliveryStatus}</li>
                                    <li>{curData.extraDetails}</li>
                                </ul>
                            </div>
                        )
                    })
                )}

                {data.length === 0 ? (
                        <>
                            <div className="bd14">
                                    <h1>No Upcoming product found</h1>
                                </div>
                                <div className="article">
                                    <h1 style={{ textAlign: 'center' }}>No Upcoming product found</h1>
                                </div>
                        </>
                        ) : (
                    data.map((curData) => {
                        return (
                            <>
                                <div className="bd14">
                                    <img src={`${BASE_URL}/${curData.productImg}`} alt="Product" />
                                </div>
                                <div className="article">
                                    <h1 style={{ textAlign: 'center' }}>Upcoming product</h1>
                                    <table style={{ width: '100%', height: '200px' }}>
                                        <tbody>
                                            <tr>
                                                <td colSpan="2">Product Name: {curData.productName}</td>
                                            </tr>
                                            <tr>
                                                <td>Category: {curData.productCategory}</td>
                                                <td>Packing: {curData.packing}</td>
                                            </tr>
                                            <tr>
                                                {/* <td>Packing: Glass gar and 2</td> */}
                                                <td>Shelf life: {curData.shelfLife}</td>
                                                <td>MRP: {curData.price} Rs.</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <label>Description: </label>
                                                    <p>{curData.description}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    })
                )}
            </div>
            <Footer />
        </>
    )
}