
const bcrypt = require("bcrypt")
const User = require("../modle/user") 
const jwt = require("jsonwebtoken");
const JWTkey="rubi"

const generateJwtToken = (id) => {
  return jwt.sign({ id },JWTkey, {
    expiresIn: "7d",
  });
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    console.log('entered authorization')
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWTkey);
    req.user = user.id;
    next();
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }

};

module.exports.Signup= async (req, res) => {
    
    try {
         const {userName,password} = req.body;

      if (!(userName &&  password)) {
        res.status(400).send("All input is required");
      }

      const oldUser = await User.findOne({userName }); 
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        userName,
        time:Date.now(),
        password: encryptedPassword,
      });
 const token = generateJwtToken(user._id)

user.token = token;
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  };


  //login

  module.exports.Login= async (req, res) => {

    
    try {
      const { userName, password } = req.body;
  
      if (!(userName && password)) {
        res.status(400).send("All input is required");
      }
    
      const user = await User.findOne({userName });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = generateJwtToken(user._id)

user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    
  };