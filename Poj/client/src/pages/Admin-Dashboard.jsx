import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useAuth } from '../store/auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminDashboard = () => {
    const [totalSalesData, setTotalSalesData] = useState([]);
    const [todaySalesData, setTodaySalesData] = useState([]);
    const [lastMonthUserData, setLastMonthUserData] = useState([]);
    const [topUsersByProduct, setTopUsersByProduct] = useState([]);
    const [todaySalesDataFetched, setTodaySalesDataFetched] = useState(false);

    const { user, authorizationToken } = useAuth();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total sales data
                const totalSalesResponse = await fetch(`${BASE_URL}/api/admin/total-sales`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });
                if (!totalSalesResponse.ok) {
                    throw new Error('Failed to fetch total sales data');
                }
                const totalSalesData = await totalSalesResponse.json();
                setTotalSalesData(totalSalesData);

                // Fetch today's sales data
                const todaySalesResponse = await fetch(`${BASE_URL}/api/admin/today-sales`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });
                if (!todaySalesResponse.ok) {
                    console.error('Failed to fetch today sales data');
                } else {
                    const todaySalesData = await todaySalesResponse.json();
                    setTodaySalesData(todaySalesData);
                    setTodaySalesDataFetched(true);
                }

                // Fetch last month user data
                const lastMonthUserResponse = await fetch(`${BASE_URL}/api/admin/last-month-user-data`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });
                if (!lastMonthUserResponse.ok) {
                    throw new Error('Failed to fetch last month user data');
                }
                const lastMonthUserData = await lastMonthUserResponse.json();
                setLastMonthUserData(lastMonthUserData);

                // Fetch top users by product data
                const topUsersByProductResponse = await fetch(`${BASE_URL}/api/admin/top-user-data`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });
                if (!topUsersByProductResponse.ok) {
                    throw new Error('Failed to fetch top users by product data');
                }
                const topUsersByProductData = await topUsersByProductResponse.json();
                setTopUsersByProduct(topUsersByProductData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [authorizationToken]);

    useEffect(() => {
        renderTotalSalesChart();
        if (todaySalesDataFetched) {
            renderTodaySalesChart();
        }
    }, [todaySalesDataFetched, totalSalesData, todaySalesData]);

    useEffect(() => {
        if (todaySalesDataFetched) {
            renderLastMonthUserTable();
            renderTopUsersByProductTable();
        }
    }, [todaySalesDataFetched, lastMonthUserData, topUsersByProduct]);

    const renderTotalSalesChart = () => {
        // Check if there is data available for total salse data
        if (totalSalesData.length === 0) {
            // Render a message indicating no data available
            return <p>No data available for total sales data</p>;
        }
        const productNames = totalSalesData.map(product => product._id);
        const totalQuantities = totalSalesData.map(product => product.totalQuantity);

        const ctx = document.getElementById('totalSalesChart').getContext('2d');

        if (window.totalSalesChartInstance !== undefined) {
            window.totalSalesChartInstance.destroy(); // Destroy the existing chart instance
        }

        window.totalSalesChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: productNames,
                datasets: [{
                    label: 'Total Sales',
                    data: totalQuantities,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'left',
                        align: 'start',
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    };

    const renderTodaySalesChart = () => {
        const ctx = document.getElementById('todaySalesChart').getContext('2d');

        if (window.todaySalesChartInstance !== undefined) {
            window.todaySalesChartInstance.destroy(); // Destroy the existing chart instance
        }

        if (todaySalesDataFetched && todaySalesData.length > 0) {
            const productNames = todaySalesData.map(product => product._id);
            const todayQuantities = todaySalesData.map(product => product.totalQuantity);

            const maxQuantity = Math.max(...todayQuantities);

            window.todaySalesChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: productNames,
                    datasets: [{
                        label: 'Today\'s Sales',
                        data: todayQuantities,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: Math.ceil(maxQuantity / 10) * 10
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 20
                                },
                                usePointStyle: false,
                                boxWidth: 0
                            }
                        }
                    }
                }
            });
        } else {
            // Render a message indicating no data available
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText("No data available for today's sales", ctx.canvas.width / 2, ctx.canvas.height / 2);
        }
    };

    const renderLastMonthUserTable = () => {
        // Check if there is data available for last month user data
        if (lastMonthUserData.length === 0) {
            // Render a message indicating no data available
            return <p>No data available for last month user data</p>;
        }

        // Mapping last month user data to table rows
        const tableRows = lastMonthUserData.map((user, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{user.userName}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{user.totalQuantity}</td>
            </tr>
        ));

        // Setting table data
        const tableComponent = (
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>User Name</th>
                            <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Total Quantity Purchased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );

        return tableComponent;
    };

    const renderTopUsersByProductTable = () => {
        // Check if there is data available for top users by product
        if (topUsersByProduct.length === 0) {
            // Render a message indicating no data available
            return <p>No data available for top users by product</p>;
        }

        const tableRows = topUsersByProduct.map((product, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                    <img src={`${BASE_URL}/${product.productImg}`} alt={`${product.productName}`} style={{ width: '150px', height: "auto", borderRadius: '8px' }} />
                </td>
                <td style={{ border: '1px solid #dddddd', padding: '8px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#000', fontSize: '1.2rem' }}>{product.productName}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                    <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '0' }}>
                        {product.topUsers.map((user, index) => (
                            <li key={index} style={{ marginBottom: '5px', fontSize: '14px', fontFamily: 'Arial, sans-serif', color: '#000', fontWeight: '600' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{user.userName}</span>
                                    <span style={{ backgroundColor: '#f2f2f2', padding: '3px 8px', borderRadius: '5px' }}>Total Quantity: {user.totalQuantity}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </td>
            </tr>
        ));

        const tableComponent = (
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif', borderSpacing: '0', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Product Image</th>
                            <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Product Name</th>
                            <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Top Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );

        return tableComponent;
    };

    return (
    <>
        {/* <div className="con">
            <div className="main">
                <div>
                    <h1 className='h1'>Welcome,&nbsp;{user ? user.userName : "User" }</h1> 
                </div>
            </div>
        </div> */}
        <div className="con">
            <div className="main">
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div style={{ width: "40%" }}>
                        <h2>Total Sales by Product</h2>
                        <canvas id="totalSalesChart" style={{ width: '200px', height: '200px' }}></canvas>
                    </div>
                    <div style={{ width: "40%" }}>
                        <h2>Today's Sales by Product</h2>
                        {todaySalesData.length === 0 && <p>No data available for today's sales</p>}
                        <canvas id="todaySalesChart" style={{ width: '200px', height: '200px' }}></canvas>
                    </div>
                </div>
                <div className="last-month-user-data">
                    <h2>Last Month User Data</h2>
                    {renderLastMonthUserTable()}
                </div>
                <div className="top-users-by-product">
                    <h2>Top Users by Product</h2>
                    {renderTopUsersByProductTable()}
                </div>
            </div>
        </div>
        </>);
};
