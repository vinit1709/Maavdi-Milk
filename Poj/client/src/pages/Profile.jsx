import { useAuth } from "../store/auth";
import "../css/Profile.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Profile = () => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  const inputStyle = {
    pointerEvents: 'none',
    backgroundColor: '#f4f4f4',
    cursor: 'default', // Set the default cursor style
  };

  const hoverStyle = {
    cursor: 'not-allowed', // Change cursor to not-allowed symbol on hover
  };
  
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const [userData, setUserData] = useState(true);

  if (userData && user) {
    setData({
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      pinCode: user.pinCode
    });

    setUserData(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/auth/profileUpdate/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

    const res_data = await response.json();

    if (response.ok) {
      toast.success(res_data.message);
    } else {
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="cont light-style flex-grow-1 container-p-y">
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <a
                    className="list-group-item list-group-item-action active"
                    data-toggle="list"
                    href="/profile">Profile</a>
                  <a className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="/change-password">Change
                    password</a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade active show"
                    id="account-general">
                    <div className="card-body media align-items-center">
                      <img
                        src={`${BASE_URL}/${user.userImg}`}
                        alt="profile"
                        className="d-block ui-w-80" />
                      <div className="media-body ml-4">
                        {/* <label className="btn btn-outline-primary">
                          Upload new photo
                          <input type="file"
                            accept="image/*"
                            className="account-settings-fileinput" />
                        </label> */}
                        {/* <div
                          className="text-light small mt-1">Allowed
                          JPG, GIF or PNG. Max size of
                          800K</div> */}
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text"
                          className="form-control mb-1"
                          id="userName"
                          name="userName"
                          value={data.userName}
                          onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email"
                          className="form-control mb-1"
                          style={{ pointerEvents: "none", backgroundColor: "#f4f4f4"}}
                          id="email"
                          name="email"
                          value={data.email}
                          readonly/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone
                          no.</label>
                        <input type="number"
                          className="form-control mb-1"
                          id="phone"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Address
                        </label>
                        <input type="text"
                          className="form-control mb-1"
                          id="address"
                          name="address"
                          value={data.address}
                          onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">city</label>
                        <input type="text"
                          className="form-control mb-1"
                          id="city"
                          name="city"
                          value={data.city}
                          onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">state</label>
                        <input type="text"
                          className="form-control mb-1"
                          id="state"
                          name="state"
                          value={data.state}
                          onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Pincode</label>
                        <input type="number"
                          className="form-control mb-1"
                          id="pinCode"
                          name="pinCode"
                          value={data.pinCode}
                          onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" type="submit" >Save changes</button>
                <NavLink className="but" to="/" >Back</NavLink>&nbsp; &nbsp; &nbsp;
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}