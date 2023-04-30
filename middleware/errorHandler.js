const {constants} = require("../constants");

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "UnAuthorized", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden", 
                message: err.message, 
                stackTrace: err.stack
                });
            break;    
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found", 
                message: err.message, 
                stackTrace: err.stack
                });
            break;
          
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No error, All Good!");
            break;
    }
};

module.exports = errorHandler; 

//"Stack trace error" is a generic term frequently
//associated with long error messages. 
//The stack trace information identifies 
//where in the program the error occurs and is helpful to programmers.
//For users, the long stack track information 
//may not be very useful for troubleshooting web errors.