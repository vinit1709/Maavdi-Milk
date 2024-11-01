import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Vendor } from "./pages/Vendor";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
// import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layout/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminProducts } from "./pages/Admin-Products";
import { AdminCategorys } from "./pages/Admin-Categorys";
import { AdminUsersUpdate } from "./pages/Admin-Users-Update";
import { AdminCategorysUpdate } from "./pages/Admin-Categorys-Update";
import { AdminCategorysAdd } from "./pages/Admin-Categorys-Add";
import { AdminProductsAdd } from "./pages/Admin-Products-Add";
import { AdminVendor } from "./pages/Admin-Vendor";
import { AdminVendorConfirm } from "./pages/Admin-Vendor-Confirm";
import { AdminProductsUpdate } from "./pages/Admin-Products-Update";
import { ProductDetails } from "./pages/Product-Details";
import { Updates } from "./pages/Updates";
import { Order } from "./pages/Order";
import { AdminTodayUpdates } from "./pages/Admin-Today-Updates";
import { AdminUpcomingProducts } from "./pages/Admin-Upcoming-Products";
import { AdminTodayUpdatesAdd } from "./pages/Admin-Today-Updates-Add";
import { AdminTodayUpdatesUpdate } from "./pages/Admin-TodayUpdates-Update";
import { ForgotPassword } from "./pages/Forgot-Password";
import { AdminOrder } from "./pages/Admin-Order";
import { ViewOrder } from "./pages/ViewOrder";
import { AdminVendorReject } from "./pages/Admin-Vendor-Reject";
import { Profile } from "./pages/Profile";
import { AdminDashboard } from "./pages/Admin-Dashboard";
import { ChangePassword } from "./pages/Change-Password";
import { AdminSystem } from "./pages/Admin-System";
import { AdminUpcomingProductsAdd } from "./pages/Admin-Upcoming-Products-Add";
import { AdminUpcomingProductsUpdate } from "./pages/Admin-Upcoming-Products-Update";
import { AdminOrdersUpdate } from "./pages/Admin-Orders-Update";
import { AdminReport } from "./pages/Admin-Report";

const App = () => {
  return <>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/about" element={<About />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/register" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/view-order/:id" element={<ViewOrder />} />

        <Route path="/product/:id/productDetails" element={<ProductDetails />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="system" element={< AdminSystem />} />
            <Route path="dashboard" element={< AdminDashboard />} />
            <Route path="users" element={< AdminUsers />} />
            <Route path="contacts" element={< AdminContacts />} />
            <Route path="categorys" element={< AdminCategorys />} />
            <Route path="products" element={< AdminProducts />} />
            <Route path="vendors" element={< AdminVendor />} />
            <Route path="today-updates" element={< AdminTodayUpdates />} />
            <Route path="upcoming-products" element={< AdminUpcomingProducts />} />
            <Route path="orders" element={< AdminOrder />} />
            <Route path="report" element={< AdminReport />} />

            <Route path="categorys/add" element={< AdminCategorysAdd />} />
            <Route path="products/add" element={< AdminProductsAdd />} />
            <Route path="today-updates/add" element={< AdminTodayUpdatesAdd />} />
            <Route path="upcoming-products/add" element={< AdminUpcomingProductsAdd />} />

            <Route path="vendors/:id/confirm" element={< AdminVendorConfirm />} />
            <Route path="vendors/:id/reject" element={< AdminVendorReject />} />

            <Route path="users/:id/edit" element={<AdminUsersUpdate />} />
            <Route path="categorys/:id/edit" element={<AdminCategorysUpdate />} />
            <Route path="products/:id/edit" element={<AdminProductsUpdate />} />
            <Route path="today-updates/:id/edit" element={<AdminTodayUpdatesUpdate />} />
            <Route path="upcoming-products/:id/edit" element={<AdminUpcomingProductsUpdate />} />
            <Route path="orders/:id/edit" element={<AdminOrdersUpdate />} />
          </Route>

      </Routes>
    </BrowserRouter>
  </>
}

export default App;