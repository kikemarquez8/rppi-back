/**
 * Created by Kike on 1/29/18.
 */
var JSONWebTokenSecret = require('./../config.json')["JSONWebToken"],
    jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    var {token} = req.body;
    if(!token){
        res.json({
            success:false,
            message:"Resource not available",
            statusCode:403
        })
    }else{
        jwt.verify(token, JSONWebTokenSecret, (err) => {
            if(!err){
                next()
            } else{
                res.json({
                    success:false,
                    statusCode:403,
                    message:"Resource not available"
                })
            }
        })
    }
}