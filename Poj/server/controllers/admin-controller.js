const User = require("../models/userSchema");
const Contact = require("../models/contactSchema");
const Product = require("../models/productSchema");
const Category = require("../models/categorySchema");
const Vendor = require("../models/vendorSchema");
const Order = require("../models/orderSchema");
const TodayUpdates = require("../models/todayUpdatesSchema");
const UpcomingProduct = require("../models/upcomingProductsSchema");
const { json } = require("body-parser");
const nodemailer = require("nodemailer");

// --------------------------------------- Extra Function Start --------------------------------------------
// ------------------------
// Function to send Email
// ------------------------
const sendEmail = async (email, subject, html) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demo15658@gmail.com',
        pass: 'ekqy tmmo wgsv iybb'
      }
    });

    var mailOptions = {
      from: 'demo15658@gmail.com',
      to: email,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

// -----------------------------------------
// Function to format date to "DD/MM/YYYY"
// -----------------------------------------
function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
// --------------------------------------- Extra Start --------------------------------------------

// --------------------------------------- Admin User Page Start --------------------------------------------
// -------------------
// getAllUsers Logic
// -------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, cpassword: 0 });
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// -------------------
// single user Logic
// -------------------
const getUsersById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0, cpassword: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

// -------------------
// user update Logic
// -------------------
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedData = await User.updateOne({ _id: id }, {
      $set: updateUserData,
    });
    // return res.status(200).json(updatedData);
    return res.status(200).json({ message: "User Data Update Successfully..", updatedData });
  } catch (error) {
    next(error);
  }
}

// -------------------
// user delete Logic
// -------------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user.isAdmin) {
      return res.status(403).json({ message: " You Can't Delete Your Self..!!" })
    }

    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully..." });
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin User Page End --------------------------------------------

// --------------------------------------- Admin Contacts Page Start --------------------------------------------
// ---------------------
// getAllContacts Logic
// ---------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

// ----------------------
// contacts delete Logic
// ----------------------
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contacts Deleted Successfully..." });
  } catch (error) {
    next(error)
  }
}
// --------------------------------------- Admin Contacts Page End --------------------------------------------

// --------------------------------------- Admin Vendore Page Start --------------------------------------------
// ---------------------
// getAllVendors Logic
// ---------------------
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
    if (!vendors || vendors.length === 0) {
      res.status(404).json({ message: "No Vendors Found" });
    }
    return res.status(200).json(vendors);
  } catch (error) {
    next(error)
  }
}

// -------------------
// single vendor Logic
// -------------------
const getVendorsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Vendor.findOne({ _id: id });
    // return res.status(200).json(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

// ---------------------
// vendor confirm Logic
// ---------------------
const confirmVendorsById = async (req, res) => {
  try {
    const id = req.params.id;
    const confirmVendor = await Vendor.findByIdAndUpdate({ _id: id }, {
      status: "Confirm"
    }, { new: true });

    if (!confirmVendor) {
      res.status(404).json({ message: "No Vendor Found" });
    }
    return res.status(200).json({ message: "Vendore Request Confirm..." })
  } catch (error) {
    next(error);
  }
}

// ---------------------
// vendor reject Logic
// ---------------------
const rejectVendorsById = async (req, res) => {
  try {
    const id = req.params.id;
    const { vendorRejectReason } = req.body;
    const rejectedVendor = await Vendor.findByIdAndUpdate({ _id: id }, {
      status: "Rejected",
      msg: vendorRejectReason
    }, { new: true });

    if (!rejectedVendor) {
      res.status(404).json({ message: "No Vendor Found" });
    }

    const name = rejectedVendor.name;
    const email = rejectedVendor.email;
    const message = rejectedVendor.msg;

    const subject = "Application Rejection Notification";
    const vendorRejectHtml = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Static Template</title>
        
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
              rel="stylesheet"
            />
          </head>
          <body
            style="
              margin: 0;
              font-family: 'Poppins', sans-serif;
              background: #ffffff;
              font-size: 14px;
            "
          >
            <div
              style="
                max-width: 680px;
                margin: 0 auto;
                padding: 45px 30px 60px;
                background: #f4f7ff;
                background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                font-size: 14px;
                color: #434343;
              "
            >
              <header>
                <table style="width: 100%;">
                  <tbody>
                    <tr style="height: 0;">
                      <td>
                        <img
                          alt=""
                          src=""
                          height="30px"
                        />
                      </td>
                      <td style="text-align: right;">
                        <span
                          style="font-size: 16px; line-height: 30px; color: #ffffff;"
                          ></span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </header>
        
              <main>
                <div
                  style="
                    margin: 0;
                    margin-top: 70px;
                    padding: 92px 30px 115px;
                    background: #ffffff;
                    border-radius: 30px;
                    text-align: center;
                  "
                >
                  <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                    <h1
                      style="
                        margin: 0;
                        font-size: 24px;
                        font-weight: 500;
                        color: #1f1f1f;
                      "
                    >
                      Your Details
                    </h1>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-size: 16px;
                        font-weight: 500;
                      "
                    >
                      Hey ${name},
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >We regret to inform you that after careful consideration, we have decided not to proceed with your vendor application for the following reason(s):
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >${message}
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >While we appreciate your interest in partnering with us, we have determined that your products/services do not align with our current business needs or standards.
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >We sincerely appreciate the time and effort you invested in your application. We encourage you to continue pursuing opportunities with other organizations that may be better suited to your offerings.
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >Although we are unable to move forward at this time, we remain open to potential collaboration in the future should our needs change or if you have new offerings that align with our requirements.
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >Thank you for your understanding.
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >Best regards,<br />
                    Maavdi milk Team
                    </p>
                  </div>
                </div>
        
                <p
                  style="
                    max-width: 400px;
                    margin: 0 auto;
                    margin-top: 90px;
                    text-align: center;
                    font-weight: 500;
                    color: #8c8c8c;
                  "
                >
                  Need help? Ask at
                  <a
                    href="maavdimilk@gmail.com"
                    style="color: #499fb6; text-decoration: none;"
                    >maavdimilk@gmail.com</a
                  >
                  or visit our
                  <a
                    href=""
                    target="_blank"
                    style="color: #499fb6; text-decoration: none;"
                    >Help Center</a
                  >
                </p>
              </main>
        
              <footer
                style="
                  width: 100%;
                  max-width: 490px;
                  margin: 20px auto 0;
                  text-align: center;
                  border-top: 1px solid #e6ebf1;
                "
              >
                <p
                  style="
                    margin: 0;
                    margin-top: 40px;
                    font-size: 16px;
                    font-weight: 600;
                    text-align: center;
                    color: #434343;
                  "
                >
                  Maavdi milk
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343; text-align: center;">
                    Chalala-Khambha Rd
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343; text-align: center;">
                    To:-Ingorala (bhad),
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343; text-align: center;">
                    Amreli, Gujarat
                </p>
                <div style="margin: 0; margin-top: 16px;">
                  <a href="" target="_blank" style="display: inline-block;">
                    <img
                      width="36px"
                      alt="Facebook"
                      src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                    />
                  </a>
                  <a
                    href=""
                    target="_blank"
                    style="display: inline-block; margin-left: 8px;"
                  >
                    <img
                      width="36px"
                      alt="Instagram"
                      src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
                  /></a>
                  <a
                    href=""
                    target="_blank"
                    style="display: inline-block; margin-left: 8px;"
                  >
                    <img
                      width="36px"
                      alt="Twitter"
                      src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                    />
                  </a>
                  <a
                    href=""
                    target="_blank"
                    style="display: inline-block; margin-left: 8px;"
                  >
                    <img
                      width="36px"
                      alt="Youtube"
                      src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
                  /></a>
                </div>
                <p style="margin: 0; margin-top: 16px; color: #434343;">
                  Copyright © 2024 Maavdi milk. All rights reserved.
                </p>
              </footer>
            </div>
          </body>
        </html>
        `
    await sendEmail(email, subject, vendorRejectHtml);

    return res.status(200).json({ message: "Vendore Request Rejected.." })
  } catch (error) {
    next(error);
  }
}

// ---------------------
// vendor delete Logic
// ---------------------
const deleteVendorById = async (req, res) => {
  try {
    const id = req.params.id;
    await Vendor.deleteOne({ _id: id });
    return res.status(200).json({ message: "Vendore Delete Successfully..." });
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Vendor Page End --------------------------------------------

// --------------------------------------- Admin Product Page Start --------------------------------------------
// --------------------
// product add Logic
// --------------------
const addProducts = async (req, res) => {
  try {
    const { productCategory, productName, description, packing, composition, shelfLife, price, storageCondition } = req.body;
    const productImg = req.file.filename;
    if (!productCategory || !productName || !description || !packing || !composition || !shelfLife || !price || !storageCondition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const addProduct = await Product({
      productCategory: productCategory,
      productImg: productImg,
      productName: productName,
      description: description,
      packing: packing,
      composition: composition,
      shelfLife: shelfLife,
      price: price,
      storageCondition: storageCondition
    })

    const productAdded = await addProduct.save();
    return res.status(200).json({ message: "Product Add Successfully...", productAdded });
  } catch (error) {
    next(error);
  }
}

// ---------------------
// getAllProducts Logic
// ---------------------
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      res.status(404).json({ message: "No Products Found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// ---------------------
// single Product Logic
// ---------------------
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// ---------------------
// update Product Logic
// ---------------------
const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { productCategory, productName, description, packing, composition, shelfLife, price, storageCondition } = req.body;
    let productImg;

    // Check if req.file exists and get filename
    if (req.file) {
      productImg = req.file.filename;
    }

    if (!productCategory || !productName || !description || !packing || !composition || !shelfLife || !price || !storageCondition) {
      // console.log("Data not Found: ", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    await Product.findByIdAndUpdate({ _id: id },
      {
        $set:
        {
          productCategory,
          productName,
          description,
          packing,
          composition,
          shelfLife,
          price,
          storageCondition,
          // Only update productImg if it's defined
          ...(productImg && { productImg })
        }
      })

    return res.status(200).json({ message: "Product update successfully..." })
  } catch (error) {
    next(error)
  }
}

// ---------------------
// delete Product Logic
// ---------------------
const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    return res.status(200).json({ message: "Product delete successfully..." });
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Product Page End --------------------------------------------

// --------------------------------------- Admin Category Page Start --------------------------------------------
// --------------------
// category add Logic
// --------------------
const addCategorys = async (req, res) => {
  try {
    const response = req.body;
    const addCategorys = await Category.create(response);
    return res.status(200).json({ message: "Category Add Successfully..", addCategorys })
  } catch (error) {
    next(error);
  }
}

// ----------------------
// getAllCategory Logic
// ----------------------
const getAllCategory = async (req, res) => {
  try {
    const categorys = await Category.find();
    if (!categorys || categorys.length === 0) {
      res.status(404).json({ message: "No Categories Found" });
    }
    return res.status(200).json(categorys);
  } catch (error) {
    next(error);
  }
}

// -----------------------
// single category Logic
// -----------------------
const getCategorysById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

// -----------------------
// category update Logic
// -----------------------
const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCategoryData = req.body;

    const updatedData = await Category.updateOne({ _id: id }, {
      $set: updateCategoryData,
    });
    return res.status(200).json({ message: "Category Data Update Successfully..", updatedData });
  } catch (error) {
    next(error);
  }
}

// ---------------------
// category delete Logic
// ---------------------
const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.deleteOne({ _id: id });
    return res.status(200).json({ message: "Category Deleted Successfully..." });
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Category Page End --------------------------------------------

// --------------------------------------- Admin Today Updates Page Start --------------------------------------------
// ------------------------
// Add Today Updates Logic
// ------------------------
const addTodayUpdates = async (req, res) => {
  try {
    const response = req.body;
    const addTodayUpdates = await TodayUpdates.create(response);
    return res.status(200).json({ message: "Today Updates Set Successfully...", addTodayUpdates })
  } catch (error) {
    // next(error);
    console.log(error);
  }
}

// -----------------------
// Get All Today Updates 
// -----------------------
const getAllTodayUpdates = async (req, res) => {
  try {
    const AllTodayUpdates = await TodayUpdates.find();
    const reverseTodayUpdates = AllTodayUpdates.reverse();
    return res.status(200).json(reverseTodayUpdates);
  } catch (error) {
    next(error);
  }
}

// --------------------------
// Get Today Updates By Id 
// --------------------------
const getTodayUpdatesById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await TodayUpdates.findOne({ _id: id });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// ---------------------------
// Update Today Updates Data
// ---------------------------
const updateTodayUpdatesById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateTodayUpdatesData = req.body;
    await TodayUpdates.updateOne({ _id: id }, {
      $set: updateTodayUpdatesData, timestamp: Date.now()
    });
    return res.status(200).json({ message: "Today Updates Update Successfully.." });
  } catch (error) {
    next(error);
  }
}

// ---------------------------
// Delete Today Updates Data
// ---------------------------
const deleteTodayUpdatesById = async (req, res) => {
  try {
    const id = req.params.id;
    await TodayUpdates.deleteOne({ _id: id });
    return res.status(200).json({ message: "Data Deleted Successfully..." });
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Today Updates Page End --------------------------------------------

// --------------------------------------- Admin Order Page Start --------------------------------------------
// ---------------------
// Get All Orders Data
// ---------------------
const getAllOrders = async (req, res) => {
  try {
    const response = await Order.find().sort({ orderDate: -1 });
    if (!response) {
      return res.status(400).json({ message: "No Order Found" });
    }
    const formattedOrders = response.map(order => {
      const formattedOrderDate = formatDate(order.orderDate);
      const formattedDeliveryDate = formatDate(order.deliveryDate);
      return { ...order._doc, orderDate: formattedOrderDate, deliveryDate: formattedDeliveryDate };
    });
    return res.status(200).json(formattedOrders);
  } catch (error) {
    next(error);
  }
}

const getOrdersById = async(req, res) => {
  try {
    const id = req.params.id;
    const response = await Order.findById({ _id: id}, { orderDate: 0, deliveryDate: 0});

    if (!response) {
      return res.status(404).json({ message: "No Order Found"});
    }

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// --------------------
// Delete Order Data
// --------------------
const deleteOrderById = async(req, res) => {
  try {
    const id = req.params.id;

    const response = await Order.deleteOne({ _id: id });

    if (!response) {
      return res.status(404).json({ message: "No Order Found"});
    }

    return res.status(200).json({ message: "Order Delete Successfully..."});a
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Order Page End --------------------------------------------

// --------------------------------------- Admin Upcoming Product Page Start --------------------------------------------
// ---------------------------
// Add Upcoming Product Data
// ---------------------------
const addUpcomingProducts = async (req, res) => {
  try {
    const { productCategory, productName, packing, price, shelfLife, description } = req.body;
    const productImg = req.file.filename;
    if (!productCategory || !productName || !packing || !price || !shelfLife || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const addProduct = await UpcomingProduct({
      productCategory: productCategory,
      productImg: productImg,
      productName: productName,
      packing: packing,
      price: price,
      shelfLife: shelfLife,
      description: description,
    })

    const productAdded = await addProduct.save();
    return res.status(200).json({ message: "Upcoming Product Add Successfully...", productAdded });
  } catch (error) {
    next(error);
  }
}

// ------------------------------
// getAllUpcomingProducts Logic
// ------------------------------
const getAllUpcomingProducts = async (req, res) => {
  try {
    const products = await UpcomingProduct.find();
    if (!products || products.length === 0) {
      res.status(404).json({ message: "No Products Found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// ---------------------
// single Product Logic
// ---------------------
const getUpcomingProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await UpcomingProduct.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "No Product Found"});
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// ---------------------
// update Product Logic
// ---------------------
const updateUpcomingProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { productCategory, productName, packing, price, shelfLife, description} = req.body;
    let productImg;

    // Check if req.file exists and get filename
    if (req.file) {
      productImg = req.file.filename;
    }

    if (!productCategory || !productName || !packing || !price|| !shelfLife || !description) {
      // console.log("Data not Found: ", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    await UpcomingProduct.findByIdAndUpdate({ _id: id },
      {
        $set:
        {
          productCategory,
          productName,
          packing,
          price,
          shelfLife,
          description,
          // Only update productImg if it's defined
          ...(productImg && { productImg })
        }
      })

    return res.status(200).json({ message: "Upcoming Product update successfully..." })
  } catch (error) {
    next(error)
  }
}

// -------------------------------
// Delete Upcoming Product Logic
// -------------------------------
const deleteUpcomingProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const upcoming = await UpcomingProduct.deleteOne({ _id: id });

    if (!upcoming) {
      return res.status(404).json({ message: "No Product Found"})
    }
    return res.status(200).json({ message: "Upcoming Product delete successfully..." });
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Upcoming Product Page End --------------------------------------------


// --------------------------------------- Admin Dashboard Page Start --------------------------------------------
// ---------------------------------------
// Get Total Sales By Product(Pie Chart)
// ---------------------------------------
const getTotalSalesByProduct = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $unwind: '$orders'
      },
      {
        $group: {
          _id: '$orders.productName',
          totalQuantity: { $sum: { $toInt: '$orders.quantity' } }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// ----------------------------------------
// Get Today Sales By Product(Bar Chart)
// ----------------------------------------
const getTodaySalesByProduct = async (req, res) => {
  try {
    // Get current date without time component
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); // Set UTC hours to 00:00:00
    const result = await Order.aggregate([
      // Match orders for the current date
      {
        $match: {
          'orderDate': {
            $gte: currentDate, // Greater than or equal to current date
            $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Less than next day
          }
        }
      },
      // Unwind orders
      { $unwind: '$orders' },
      // Group by product name and sum quantity
      {
        $group: {
          _id: '$orders.productName',
          totalQuantity: { $sum: { $toInt: '$orders.quantity' } }
        }
      }
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'No products found for today.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// -----------------------------------------------
// Get Last Month Vendor Total Purches Prpducts
// -----------------------------------------------
const getTopUsersByProductLastMonth = async (req, res) => {
  try {
    // Calculate the date for one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setUTCMonth(oneMonthAgo.getUTCMonth() - 1); // Substract one month
    const result = await Order.aggregate([
      // Match orders for the last month
      {
        $match: {
          'orderDate': {
            $gte: oneMonthAgo // Greater than or equal to one month ago
          }
        }
      },
      // Unwind orders
      { $unwind: '$orders' },
      // Group by user and sum quantity for each user
      {
        $group: {
          _id: '$userId', // Group by user
          userName: { $first: '$userName' }, // Assuming userName is a field in the Order collection
          totalQuantity: { $sum: { $toInt: '$orders.quantity' } } // Sum the quantity
        }
      },
      // Sort users based on the total number of products purchased, in descending order
      { $sort: { totalQuantity: -1 } }
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'No products found for the last month.' });
    }
    // Separate users who purchased the most products from the rest
    const topUsers = result.filter(user => user.totalQuantity === result[0].totalQuantity);
    const remainingUsers = result.filter(user => user.totalQuantity !== result[0].totalQuantity);
    // Concatenate the lists
    const finalResult = topUsers.concat(remainingUsers);
    return res.status(200).json(finalResult);
  } catch (error) {
    next(error);
  }
}

// ---------------------------------------------------------
// Get Top 3 Vendors By Products Purces for All Products
// ---------------------------------------------------------
const getTopUsersForAllProducts = async (req, res) => {
  try {
    const result = await Order.aggregate([
      // Unwind orders array
      { $unwind: '$orders' },
      // Group by user and product, and sum quantity for each user and product
      {
        $group: {
          _id: {
            userId: '$userId',
            userName: '$userName',
            productName: '$orders.productName'
          },
          totalQuantity: { $sum: { $toInt: '$orders.quantity' } } // Sum the quantity
        }
      },
      // Sort users based on the total number of products purchased, in descending order
      { $sort: { '_id.productName': 1, totalQuantity: -1 } },
      // Group by product to accumulate top 3 users
      {
        $group: {
          _id: '$_id.productName',
          topUsers: {
            $push: {
              userId: '$_id.userId',
              userName: '$_id.userName',
              totalQuantity: '$totalQuantity'
            }
          }
        }
      },
      // Lookup to fetch productImg from products collection
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'productName',
          as: 'product'
        }
      },
      // Unwind the product array
      { $unwind: '$product' },
      // Project to shape the output
      {
        $project: {
          _id: 0,
          productName: '$_id',
          productImg: '$product.productImg',
          topUsers: { $slice: ['$topUsers', 3] } // Retain only the top 3 users
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
// --------------------------------------- Admin Dashboard Page End --------------------------------------------

// ------------------
// Get Salse Report 
// ------------------
const getSalesReport = async (req, res) => {
    try {
        const salesData = await Order.find();

        const report = {
            totalSalesOfMonth: 0,
            totalSalesByUser: {},
            salesByProduct: {}
        };

        salesData.forEach(sale => {
            // Calculate total sales of the month
            report.totalSalesOfMonth += parseFloat(sale.grandTotal);

            // Calculate total sales by user
            if (report.totalSalesByUser[sale.userName]) {
                report.totalSalesByUser[sale.userName] += parseFloat(sale.grandTotal);
            } else {
                report.totalSalesByUser[sale.userName] = parseFloat(sale.grandTotal);
            }

            // Calculate sales by product
            sale.orders.forEach(order => {
                if (report.salesByProduct[order.productName]) {
                    report.salesByProduct[order.productName] += parseInt(order.quantity);
                } else {
                    report.salesByProduct[order.productName] = parseInt(order.quantity);
                }
            });
        });
        return res.status(200).json(report);
    } catch (error) {
        next(error);
    }
};



module.exports = {
  addCategorys, addProducts, addTodayUpdates, addUpcomingProducts,
  getAllUsers, getAllContacts, getAllProducts, getAllCategory, getAllVendors, getAllTodayUpdates, getAllOrders, getAllUpcomingProducts,
  getUsersById, getProductById, getCategorysById, getVendorsById, getTodayUpdatesById, getUpcomingProductById, getOrdersById,
  updateUserById, updateProductById, updateCategoryById, updateTodayUpdatesById, updateUpcomingProductById,
  deleteUserById, deleteContactById, deleteProductById, deleteCategoryById, deleteVendorById, deleteTodayUpdatesById, deleteOrderById, deleteUpcomingProductById,
  confirmVendorsById, rejectVendorsById,
  getTotalSalesByProduct, getTodaySalesByProduct, getTopUsersByProductLastMonth, getTopUsersForAllProducts, getSalesReport
};