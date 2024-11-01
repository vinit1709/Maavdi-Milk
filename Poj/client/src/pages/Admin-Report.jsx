import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../css/AdminReport.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminReport = () => {
    const { authorizationToken } = useAuth();

    const [loading, setLoading] = useState(false);
    const [salesData, setSalesData] = useState(null);

    const fetchSalesData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/sales/report`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            if (response.ok) {
                setSalesData(data);
            }
        } catch (error) {
            console.error('Error fetching sales data: ', error);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    // Generate PDF content based on the sales data
    const generateReport = () => {
        const capture = document.querySelector('.sales-report');
        setLoading(true);
    
        // Get the text content of the .sales-report element
        const salesReportText = capture.innerText;
    
        // Generate PDF
        const doc = new jsPDF();
        
        // Set font size and type if needed
        doc.setFontSize(12); // Adjust as needed
        doc.setFont("helvetica"); // Adjust as needed
    
        // Split the content into lines and add them to the PDF
        const lines = doc.splitTextToSize(salesReportText, doc.internal.pageSize.getWidth() - 20); // Adjust margin as needed
        doc.text(10, 10, lines); // Adjust position as needed
    
        setLoading(false);
        doc.save('sales_report.pdf');
    }

    return (
        <>
            <div className="con">
                <div className="main">
                    {/* <h1>Manage System</h1> */}
                    <div className="sales-report">
                        <h1>Sales Report</h1>
                        {loading && <p>Loading...</p>}
                        {salesData && (
                            <div className="report-data">
                                <label>Total Sales of the Month: {salesData.totalSalesOfMonth}</label>
                                <br />
                                <div className="product-sales">
                                    <label>Sales by Product:</label>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Total Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {Object.entries(salesData.salesByProduct).map(([productName, salesCount]) => (
                                            <tr>
                                                <td>{productName}</td>
                                                <td>{salesCount} Crates</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                <div className="user-sales">
                                    <label>Total Sales by User:</label>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Vendor Name</th>
                                                <th>Total Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {Object.entries(salesData.totalSalesByUser).map(([userName, totalSales]) => (
                                            <>
                                            <tr>
                                                <td>{userName}</td>
                                                <td>{totalSales} Rs/-</td>
                                            </tr>
                                            </>
                                        ))}
                                        <tr>
                                            <td style={{ background: "#ccc", fontWeight: "700"}}>Total Sales of the Month</td>
                                            <td style={{ background: "#ccc", fontWeight: "700"}}>{salesData.totalSalesOfMonth} Rs/-</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        )}
                    </div>
                    <center><button onClick={generateReport} disabled={!salesData || loading}>
                        {loading ? 'Generating...' : 'Generate PDF'}
                    </button></center>
                </div>
            </div>
        </>
    );
};
