import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../css/Order.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Footer } from "../components/Footer";
import { NavLink, Navigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Order = () => {
    const { user } = useAuth();

    if (!user.email) {
        toast.error("To Place Order You Won't Login First..!!")
        return <Navigate to="/login" />;
    }

    const [productData, setProductData] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [deliveryDate, setDeliveryDate] = useState("");
    const [totalPrices, setTotalPrices] = useState({});
    const [grandTotal, setGrandTotal] = useState(0);

    const [selectedIndex, setSekectedIndex] = useState("");

    const [deliveryDateError, setDeliveryDateError] = useState("");
    const [orderError, setOrderError] = useState("");


    const handleChange = (event, productName, packing) => {
        const { value } = event.target;
        setOrderDetails(prevOrderDetails => ({
            ...prevOrderDetails,
            [productName]: {
                ...prevOrderDetails[productName],
                quantity: value,
                packing: packing
            }
        }));
    };

    const handleDateChange = (event) => {
        setDeliveryDate(event.target.value);
    };

    const getAllProductData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/data/product`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            if (response.ok) {
                setProductData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProductData();
    }, []);

    useEffect(() => {
        // Calculate total price for each product and grand total
        let newGrandTotal = 0;
        const newTotalPrices = {};
        productData.forEach(product => {
            const quantity = orderDetails[product.productName]?.quantity || 0;
            const price = product.price || 0;
            const totalPrice = quantity * price;
            newTotalPrices[product.productName] = totalPrice;
            newGrandTotal += totalPrice;
        });
        setTotalPrices(newTotalPrices);
        setGrandTotal(newGrandTotal);
    }, [orderDetails, productData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let submit = true;

        if (selectedIndex === "") {

            // Delivery Date Validate
            if (deliveryDate === "") {
                submit = false;
                setDeliveryDateError("Please Select Delivery Date");
            } else {
                setDeliveryDateError("");
                submit = true
            }

            // Quantity Validate
            let anyProductPurchased = false;
            for (const productName in orderDetails) {
                if (orderDetails.hasOwnProperty(productName) && orderDetails[productName].quantity > 0) {
                    anyProductPurchased = true;
                    break;
                }
            }

            if (!anyProductPurchased) {
                submit = false;
                setOrderError("Please Purchase At Least 1 item.");
            } else {
                setOrderError("");
                submit = true;
            }
        }

        const allOrderDetails = [];
        for (const productName in orderDetails) {
            if (orderDetails.hasOwnProperty(productName)) {
                const productDetail = orderDetails[productName];
                const orderObject = {
                    userId: user._id,
                    userName: user.userName,
                    productName: productName,
                    packing: productDetail.packing,
                    quantity: productDetail.quantity,
                    deliveryDate: deliveryDate, // Include delivery date in order object'
                    totalPrices: totalPrices,
                    grandTotal: grandTotal
                };
                allOrderDetails.push(orderObject);
            }
        }

        try {
            if (submit === true) {
                const response = await fetch(`${BASE_URL}/api/order/orders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(allOrderDetails)
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message);
                    setDeliveryDate("");
                    setOrderDetails(['']);
                } else {
                    toast.error(data.extraDetails ? data.extraDetails : data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            <h1 className="h1">Welcome, {user ? user.userName : "User" }</h1>
            <div className="line"></div>
            <form onSubmit={handleSubmit}>
                <div className="date" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <label htmlFor="deliveryDate" style={{ marginRight: '10px', fontSize: '16px', color: '#333' }}>Delivery Date: </label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            backgroundColor: '#fff',
                            outline: 'none',
                            transition: 'box-shadow 0.3s ease',
                            width: '200px'
                        }}
                        value={deliveryDate}
                        onChange={handleDateChange}
                    />
                </div>
                <center><div style={{ color: "red" }}>{deliveryDateError}</div></center>

                <div className="corn1">
                    <div className="prod-grid2">
                        {productData.map((curData, index) => (
                            <div className="prod" key={index}>
                                <h3 style={{ color: "#000" }}>{curData.productName}</h3>
                                <img src={`${BASE_URL}/${curData.productImg}`} alt={curData.productName} />
                                <p></p>
                                {curData.packing.map((pack, i) => (
                                    <div className="abc" key={i}>
                                        <label>{pack} :</label>
                                        <input
                                            type="number"
                                            id={`${curData.productName}-${i}-quantity`}
                                            name={`${curData.productName}-${i}-quantity`}
                                            value={(orderDetails[curData.productName] && orderDetails[curData.productName].quantity) || 0}
                                            onChange={(e) => handleChange(e, curData.productName, pack)}
                                        // defaultValue="0"
                                        />
                                    </div>
                                ))}
                                <div className="xyz">
                                    <span>Price: {curData.price}</span>
                                    <span>Total: {totalPrices[curData.productName]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <center><div style={{ color: "red" }}>{orderError}</div></center>
                    <center><div style={{ color: "red" }}>{deliveryDateError}</div></center>
                </div>
                <center><div className="total">Grand Total: {grandTotal}</div></center>
                <center><button type="submit" style={{ marginBottom: "20px" }}>Submit</button></center>
            </form>
            <center><NavLink className="but" to={`/view-order/${user._id}`} style={{ marginBottom: "50px" }}>View Order</NavLink></center> <br />
            <Footer />
        </>
    )
}
