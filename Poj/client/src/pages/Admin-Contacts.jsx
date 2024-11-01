import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import "../css/AdminUser.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const [search, setSearch] = useState("");

    const { authorizationToken } = useAuth();

    const getAllContactsData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })

            // console.log("Contacts",response);
            const data = await response.json();

            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete the contact on delete button
    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const res_data = response.json();
            // console.log("Contact after delete: ", res_data.message);
            if (response.ok) {
                toast.success("Contacts Deleted Successfully...");
                // toast.success(res_data.message);
                getAllContactsData();
            } else {
                toast.error("Contacts Not Deleted..!!");
                // toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllContactsData();
    }, []);

    return (<>
        <div className="con">
            <div className="main">
                <h1>Contacts / Feedbacks</h1>
                <form className="search">
                    <input type="text"
                        id="search"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name" />
                </form>
                <table>

                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Delete</th>
                        {/* <th rowspan="2">Total</th> */}
                    </tr>

                    {contactData.length === 0 ? (
                        <tr>
                            <td colSpan="6">No Contact found</td>
                        </tr>
                    ) : (
                        contactData.filter((curContactData) => {
                            const lowercaseSearch = search.toLowerCase();
                            const lowercaseUserName = curContactData.userName.toLowerCase();
                            return lowercaseSearch === '' ? curContactData : lowercaseUserName.includes(lowercaseSearch);
                        })
                            .map((curContactData, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{curContactData.userName}</td>
                                    <td>{curContactData.email}</td>
                                    <td>{curContactData.phone}</td>
                                    <td>{curContactData.message}</td>
                                    <td><button className="del" onClick={() => deleteContact(curContactData._id)}> Delete</button></td>
                                </tr>
                            })
                    )}
                </table>
            </div>
        </div>
    </>)
};