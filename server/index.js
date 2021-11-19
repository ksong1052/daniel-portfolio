const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();

/* Handling Json Data in Node */
app.use(express.json());

/* Configuring static folder */
app.use("/images", express.static(path.join(__dirname,"/images")));

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB..."))
.catch((err) => console.log(err));

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
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


/* Using port to connect Server */ 
app.listen(PORT, ()=> {
  console.log(`Server is running on port: ${PORT}`);
})