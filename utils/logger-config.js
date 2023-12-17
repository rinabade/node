const winston = require('winston');

const reqLogger = (level, message, {method, url, payload}) => {
    const logger = winston.createLogger({
        level: level,
        message: message,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.metadata(),
            winston.format.colorize()
        ),
        defaultMeta : {
            service : "User-Information-Record"
        },
        transports: [
            new winston.transports.Console()
        ]
    });

    const metadata = {method, url, payload};

    if(level == "info") 
        logger.info(message, metadata);

    else if(level == "error") 
        logger.error(message, metadata);
};

const Logger = (level, message) => {
    const logger = winston.createLogger({
        level: level,
        message: message,
        format: winston.format. combine(
            winston.format.timestamp(),      
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize(),            
        ),
        defaultMeta:{
            service : "User-Information-Record"
        },
        transports: [
            new winston.transports.Console()
        ]
    });

    if(level == "info") 
        logger.info(message);

    else if(level == "error") 
        logger.error(message);
}

module.exports = {
    reqLogger,
    Logger
}