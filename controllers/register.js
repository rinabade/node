const User = require('../models/user');
const { Op } = require('sequelize');
const {reqLogger, Logger} = require('../utils/logger-config');

const register = async(req,res)=>{
    try {
        const { firstname, lastname, email, address, phone_number } = req.body;
    
        // Check if the email already exists
        const existingUser = await User.findOne({
          where: {
            email: {
              [Op.eq]: email,
            },
            phone_number: {
                [Op.eq]: phone_number,
              },
          },
        });
    
        if (existingUser) {
            reqLogger("error", 'Email already exists', {
                method: req.method,
                url: req.OriginalUrl,
                payload: req.body
            })
          return res.status(400).json({ error: 'Email already exists' });
        }
    
        // Create a new user
        const newUser = await User.create({
          firstname,
          lastname,
          email,
          address,
          phone_number,
        });
        reqLogger("error", 'Email already exists', {
            method: req.method,
            url: req.OriginalUrl,
            payload: req.body
        });
        return res.status(201).json(newUser);
      } 
      catch (error) {
        Logger("error",`Error registering user: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {register};