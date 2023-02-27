const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = new User({
      user_name: req.body.user_name,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post('/login', async(req, res) =>{
    try {
        const user = await User.findOne({username: req.body.user_name})
        if(!user){
            return res.status(400).json("Wrong credentials");
        }
        const passwordCompare =  await bcrypt.compare(req.body.password, user.password)
        if(!passwordCompare){
            return res.status(500).json("Wrong credentials");
        }

        const {password, ...others} = user._doc

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
        
    }
})



module.exports = router;



