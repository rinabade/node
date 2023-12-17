const {User} = require('../models/user');
const {reqLogger, Logger} = require('../utils/logger-config');

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({
          where: { email },
        });
    
        // If the user does not exist, return an error
        if (!user) {
          reqLogger("error", 'Invalid credentials', {
            method : req.method,
            url : req.OriginalUrl,
            payload : req.body
          });
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Compare password with the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        // If passwords match, login is successful
        if (passwordMatch) {
          reqLogger("info", 'Login successful', {method : req.method, url : req.OriginalUrl, payload : req.body });

          // generate token


          return res.status(201).json({ message: 'Login successful' });
        } 
        else {
            reqLogger("info", 'Invalid credentials', {
                method : req.method,
                url : req.OriginalUrl,
                payload : req.body
              });
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } 
    catch (error) {
        Logger('error',`Login error: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {login};