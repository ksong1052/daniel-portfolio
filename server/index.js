const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

dotenv.config();

/* Handling Json Data in Node */
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB..."))
.catch((err) => console.log(err));

/* Getting Router */ 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

/* Using port to connect Server */ 
app.listen(PORT, ()=> {
  console.log(`Server is running on port: ${PORT}`);
})