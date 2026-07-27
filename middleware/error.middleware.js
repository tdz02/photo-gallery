const { sendError } = require("../utils/response");

exports.errorHandler = (

    err,

    req,

    res,

    next

)=>{

    console.error(err);

    sendError(

        res,

        err.message,

        err.statusCode || 500

    );

};