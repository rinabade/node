const {reqLogger, Logger} = require('../utils/logger-config');

const requestMiddleware = async (req,res,next) =>{
    try {
        reqLogger("info", "Sending Request",{
            method: req.method,
            url: req.OriginalUrl,
            payload: req.params
        })
        await next();
    } 
    catch (error) {
        reqLogger("error", `Error in requestMiddleware: ${error.message}`,{
            method: req.method,
            url: req.OriginalUrl,
            payload: req.params
        })
        await next(error);
    }
}

const errorMiddleware = async (req,res,next) =>{
    try {
        Logger("info", "Incoming Request",{
            method: req.method,
            url: req.OriginalUrl,
            payload: req.params
        })
        await next();
    } 
    catch (error) {
        Logger("error", `Error in errorMiddleware: ${error.message}`,{
            method: req.method,
            url: req.OriginalUrl,
            payload: req.params
        })
        await next(error);
    }
}

module.exports = {
    requestMiddleware,
    errorMiddleware
}