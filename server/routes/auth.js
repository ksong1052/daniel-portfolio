const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {

    /* Bcrypt configuration */
    // 1. 
    // 🌟 중요 🌟 bcrypt에서 password를 넘길 때는 String 타입이어야 한다.
    const salt = await bcrypt.genSalt(10);
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

    // 2. 
    // const saltRounds = 10;
    // const password = req.body.password;
    // console.log("password: ", password);

    // bcrypt.genSalt(saltRounds, (err, salt) =>{
    //   if(err) {
    //     throw err;
    //   } else {
    //     console.log("salt: ", salt);
    //     bcrypt.hash(password, salt, (err, hashedPass) => {
    //       if(err) {
    //         throw err;
    //       } else {    
    //         // Getting the new user information
    //         const newUser = new User({
    //           username: req.body.username,
    //           email: req.body.email,
    //           password: hashedPass,
    //         });

    //         // Sending the new saved user to Web
    //         const user = newUser.save();
    //         res.status(200).json(user);
    //       }        
    //     });
    //   }      
    // });
    
  } catch(err) {
    res.status(500).json(err);
  }
});


// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json("There is no user you are looking for..!");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Wrong Password...!") ;

    // Only getting user information except for Password
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;