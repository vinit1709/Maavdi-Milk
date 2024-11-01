const User = require("../models/userSchema");
const Otp = require("../models/otpSchema");
const nodemailer = require("nodemailer");
const Order = require("../models/orderSchema");


// -----------------------------------
// Function to generate a random OTP
// -----------------------------------
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};

// --------------------------------
// Function to send OTP via email
// --------------------------------
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

// -------------------
// Registration Logic
// -------------------
const register = async (req, res) => {
  const { userName, email, phone, address, city, state, pinCode, password, cpassword } = req.body;
  if (!userName || !email || !phone || !address || !city || !state || !pinCode || !password || !cpassword) {
    res.status(420).json({ error: "fill the details" })
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ userName, email, phone, address, city, state, pinCode, password, cpassword });

    const name = await userCreated.userName;
    const userEmail = await userCreated.email;
    const userPassword = await userCreated.password;

    const registrationSubject = "Registration Successful with Maavdi";
    const registrationHtml = `<!DOCTYPE html>
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
                    >
                    Congratulations on successfully registering with Maavdi milk! Welcome<br /><br />

                    Thank you for choosing Maavdi milk. We're excited to have you join our community. Your registration process is now complete.<br /><br />
                    
                    Here are your login details:<br /><br />
                    <span style="font-weight: 600; color: #1f1f1f;">Email: </span>${userEmail} <br />
                    <span style="font-weight: 600; color: #1f1f1f;">Password: </span>${userPassword} <br /><br />
                    
                    Please remember to keep your password confidential and do not share it with anyone, including Maavdi employees. For security reasons, we recommend changing your password immediately after receiving this email.<br /><br />
                    
                    If you have any questions or need assistance, feel free to reach out to us at maavdimilk@gmail.com.<br /><br />
                    
                    We look forward to serving you!<br /><br />                  
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
    await sendEmail(userEmail, registrationSubject, registrationHtml);

    res.status(201).json({
      message: "Registration Successfully...",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString()
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// -------------------
// User Login Logic
// -------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (email === userExist.email) {
      if (password === userExist.password) {
        res.status(200).json({
          message: "Login Successfully...",
          token: await userExist.generateToken(),
          userId: userExist._id.toString()
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// --------------------------------
// Forgot Password by Email Logic
// --------------------------------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await User.findOne({ email });
    if (!response) {
      return res.status(400).json({ message: "User not existed" });
    }
    const otp = generateOTP();
    const subject = "OTP for Password Reset";
    const data = await Otp.findOne({ email });

    if (!data) {
      await Otp.create({
        email: email,
        code: otp,
        expireIn: new Date().getTime() + 300 * 1000
      })
    }

    await Otp.updateOne({
      email: email,
      code: otp,
      expireIn: new Date().getTime() + 300 * 1000
    })
    const forgotPasswordHtml = `<!DOCTYPE html>
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
                          src="https://drive.google.com/drive/u/0/folders/1RxseBSqNC6WEXZUaQpmTwFREPkHqZK33"
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
                      Your OTP
                    </h1>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-size: 16px;
                        font-weight: 500;
                      "
                    >
                      Hey ${email},
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      "
                    >
                      Thank you for choosing Maavdi milk. Use the following OTP
                      to complete the procedure to change your password. OTP is
                      valid for
                      <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                      Do not share this code with others, including Maavdi
                      employees.
                    </p>
                    <p
                      style="
                        margin: 0;
                        margin-top: 60px;
                        font-size: 40px;
                        font-weight: 600;
                        letter-spacing: 25px;
                        color: #ba3d4f;
                      "
                    >
                      ${otp}
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
                    color: #434343;
                  "
                >
                  Maavdi milk
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343;">
                    Chalala-Khambha Rd
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343;">
                    To:-Ingorala (bhad),
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343;">
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
    await sendEmail(email, subject, forgotPasswordHtml);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
}

// -------------------------------------
// Reset Password by Email & OTP Logic
// -------------------------------------
const ResetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const response = await Otp.findOne({ email });
    if (response.code !== otp) {
      return res.status(200).json({ message: "Invalid OTP" })
    }
    await User.updateOne({ email }, {
      password: password,
      cpassword: password
    })
    return res.status(200).json({ message: "Password Change Successfully.." });
  } catch (error) {
    next(error);
  }
}


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

// -----------------
// View Order Logic
// -----------------
const viewOrder = async (req, res) => {
  try {
    const { id } = req.params; // Corrected destructuring
    const response = await Order.find({ userId: id }).sort({ orderDate: -1 });
    if (response.length === 0) { // Checking if response is empty
      return res.status(404).json({ message: "No Order Found" }); // Corrected status code
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

// --------------------------------
// User Logic - to send user data
// --------------------------------
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------
// Get User Data & Display on Profile
// ------------------------------------
const userProfileUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, email, phone, address, city, state, pinCode } = req.body;
    const response = await User.findByIdAndUpdate({ _id: id }, {
      userName: userName,
      email: email,
      phone: phone,
      address: address,
      city: city,
      state: state,
      pinCode: pinCode
    }, {new: true});

    if (!response) {
      return res.status(404).json({ message: "No User Found..!!"});
    }

    return res.status(200).json({ message: "User Data Updated..."});
  } catch (error) {
    next(error);
  }
}

const userPasswordUpdate = async(req, res) => {
  try {
    const id = req.params.id;
    const { password, newPassword, newConfimPassword } = req.body;
    const userExist = await User.findOne({ _id: id});

    if (!userExist) {
      return res.status(404).json({ message: "No User Found..!!"});
    }

    if (userExist.password === password) {
      const response = await User.findByIdAndUpdate({ _id: id }, {
        password: newPassword,
        cpassword: newConfimPassword
      }, {new: true});
    } else {
      return res.status(404).json({ message: "Please Check Your Current Password..!!"});
    }

    return res.status(200).json({ message: "Password Update Successfully..."});
  } catch (error) {
    console.log(error);
  }
}

module.exports = { register, login, forgotPassword, ResetPassword, viewOrder, user, userProfileUpdate, userPasswordUpdate };