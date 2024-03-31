const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { Server } = require("http");
const colors = require("colors");
const { connect } = require("http2");
const path = require("path");
const connectDb = require("./config/connectDB");

// config dot env file

dotenv.config();

// data base call
connectDb();

// rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes user
app.use("/api/v1/users", require("./routes/userRoute"));

// transaction routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

// static files

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// port

const PORT = 8080 || process.env.PORT;

// listen Server

app.listen(PORT, () => {
  console.log(`server live on port ${PORT}`);
});
