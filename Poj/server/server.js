const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./router/auth-router");
const vendorRouter = require("./router/vendor-router");
const contactRoute = require("./router/contact-router");
const productRoute = require("./router/product-router");
const updateRouter = require("./router/updates-router");
const categoryRouter = require("./router/category-router");
const orderRouter = require("./router/order-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./db/db");
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credential: true,
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", express.static("uploads"))

app.use("/api/auth",authRoute);
app.use("/api/form", vendorRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", productRoute);
app.use("/api/data", categoryRouter);
app.use("/api/update", updateRouter);
app.use("/api/order", orderRouter);

// let's define admin route
app.use("/api/admin", adminRoute)

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDb().then(() =>{
    app.listen(PORT, () => {
        console.log(`server is runing at port: ${PORT}`);
    });
}).catch((error) => {
    console.log("server is not working: ",error);
});