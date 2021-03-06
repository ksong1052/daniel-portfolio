const User = require("../models/User");
const bcrypt = require("bcrypt");

// Configuring bcrypt
const jwt = require('jsonwebtoken');
const jwtSecretKey = "mySecretKey!23";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

// Register
module.exports.register = async (req, res) => {
  try {

    /* Bcrypt configuration */
    // ๐ ์ค์ ๐ bcrypt์์ password๋ฅผ ๋๊ธธ ๋๋ String ํ์์ด์ด์ผ ํ๋ค.
    const salt = await bcrypt.genSalt(bcryptSaltRounds);
    const password = req.body.password;
    const hashedPass = await bcrypt.hash(password, salt);    

    // Getting the new user information
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // Sending the new saved user to Web
    const user = await newUser.save();
    res.status(200).json(user);
        
  } catch(err) {
    res.status(500).json(err);
  }
};

// login
module.exports.login = async (req, res) => {
  try {    
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json("There is no user you are looking for..!");

    const authPassword = await bcrypt.compare(req.body.password, user.password);
    !authPassword && res.status(400).json("Wrong Password...!") ;

    // โญ Important โญ : Only getting user information except for Password
    // const { password, ...others } = user._doc; 
    // res.status(200).json(others); 

    // โญ User information except for Password & Generating User Token  
    // ํ์ํ data๋ฅผ ๊ฐ์ฒด์ ๋ด์ ๋ณด๋ธ๋ค. Client์์๋ ๋๊ฐ์ ์ ๋ณด๋ฅผ ๋ฐ๋ก ๋ฐ์ ๋ณผ ์ ์๋ค.
    const { password, ...others } = user._doc;    
    const token = createJwtToken(others._id);    
    res.status(201).json({ token, others });    
  } catch (err) {
    res.status(500).json(err);
  }
};

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};
