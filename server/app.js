const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');

// Getting Environmental Variables
const config = require('./config');

// .env에 저장해 놓은 환경변수 값를 가져 올 수 있다.
dotenv.config();

/* MongoDB Connection */
require('./database/db');

/* Handling Json Data in Node */
app.use(express.json());

app.use(bodyParser.json());


// Getting Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");

/* Configuring static folder */
app.use("/images", express.static(path.join(__dirname,"/images")));

// Multer: 이미지 업로드를 위한  Library
// 이미지 업로드는 client side에서 설정하는 부분이 필요하다.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  }, 
  filename: (req, file, cb) => {
    //cb(null, "myimage.png");
    cb(null, req.body.name);
  }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded...!!!");
});

/* Getting Router */ 
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

/* Using port to connect Server */ 
const PORT = config.host.port || 5000;
app.listen(PORT, ()=> {
  console.log(`Server is running on port: ${PORT}`);
})