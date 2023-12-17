const {User} = require('../models/user');
const { Op } = require('sequelize');
const {reqLogger, Logger} = require('../utils/logger-config');

const register = async(req,res)=>{
  const { firstname, lastname, email, address, phone_number } = req.body;
    try {    
      // Check if the email already exists
      const existingUser = await User.findOne({
        where: {
          email: {
            [Op.eq]: email,
          }
        },
      });
  
      if (existingUser) {
        reqLogger("error", 'Email already exists', {
            method: req.method,
            url: req.OriginalUrl,
            payload: req.body
        });
        return res.status(400).json({ message: 'Email already exists' });
      }
      else{
        // Create a new user
        const newUser = await User.create({
          firstname,
          lastname,
          email,
          address,
          phone_number
        });
        reqLogger("info", 'User created', {
          method: req.method,
          url: req.OriginalUrl,
          payload: req.body
        });
        return res.status(201).json({ message: 'User created', user: newUser });
      }
    } 
    catch (error) {
      Logger("error",`Error registering user: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {register};