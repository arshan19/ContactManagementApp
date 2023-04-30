const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const multer = require("multer");

connectDb();
const app = express();
const port = process.env.PORT || 5000;// static server we are giving

app.use(express.json());
app.use("/api/Contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/upload",require("./routes/imageRoutes"));//image routes
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})