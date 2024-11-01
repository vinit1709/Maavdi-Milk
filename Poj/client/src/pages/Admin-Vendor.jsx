import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { GoDotFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import "../css/AdminVendor.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AdminVendor = () => {
    const [vendorsData, setVendorsData] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");


    const { authorizationToken } = useAuth();

    // get all vendors data
    const getAllVendorsData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/vendors`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                },
            });

            const data = await response.json();

            if (response.ok) {
                setVendorsData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete the contact on delete button
    const deleteVendor = async (id) => {
        console.log(id);

        try {
            const response_delete = await fetch(`${BASE_URL}/api/admin/vendors/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            console.log(response_delete);
            const res_data = await response_delete.json();
            console.log(res_data);

            if (response_delete.ok) {
                toast.success(res_data.message);
                getAllVendorsData();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllVendorsData();
    }, []);

    return (
        <>
            <div class="con">
                <h1>Vendor Inquiry </h1>
                <div className="filter-container">
                    <form className="search">
                        <input type="text"
                            id="search"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name" />
                    </form>
                    <div className="status-filter">
                        <label htmlFor="status">Filter by Status: </label>
                        <select id="status" name="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="confirm">Confirm</option>
                            <option value="pending">Pending</option>
                            <option value="reject">Reject</option>
                        </select>
                    </div>
                </div>
                <div class="main1">
                    {vendorsData.length === 0 ? (
                        <div className="contact-box">
                            <h3>No Vendor Rquest Found</h3>
                        </div>
                    ) : (
                        vendorsData.filter((curData) => {
                            const lowercaseSearch = search.toLowerCase();
                            const lowercaseName = curData.name.toLowerCase();
                            const statusMatches = statusFilter ? curData.status.toLowerCase() === statusFilter : true;
                            return (lowercaseSearch === '' || lowercaseName.includes(lowercaseSearch)) && statusMatches;
                        })
                            .map((curData, index) => {
                                return (
                                    <div class="contact-box">
                                        <div className="abc">
                                            <h3>Name: {curData.name}</h3>
                                            <div className="status">
                                                <GoDotFill /><p>{curData.status}</p>
                                            </div>
                                        </div>
                                        <p>Email: {curData.email}</p>
                                        <p>Phone no.: {curData.phone}</p>
                                        <p>Street Address: {curData.address}</p>
                                        <p>City: {curData.city}</p>
                                        <p>State: {curData.state}</p>
                                        <p>Pin Code: {curData.pinCode}</p>
                                        <p>Requested Service: {curData.serviceRequest}</p>
                                        <div class="buttons">
                                            <Link className="but" to={`/admin/vendors/${curData._id}/confirm`}>Confirm</Link>
                                            <Link className="bt" to={`/admin/vendors/${curData._id}/reject`}> Reject</Link>
                                            <button className="del" onClick={() => deleteVendor(curData._id)}> Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                    )}
                </div>
            </div>
        </>
    )
}