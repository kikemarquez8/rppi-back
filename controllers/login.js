/**
 * Created by Kike on 1/29/18.
 */
var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    User = require('./../model/users'),
    secret = require('./../config.json')["JSONWebToken"],
    {db1,db2} = require('./../db/index');



router.post('/' ,(req, res) => {
    var data = req.body;
    var db = req.body.primaryDB?db1:db2;
    User.fetch({email:data.email},db)
        .then((userData) => {
            if(bcrypt.compareSync(data.password, userData.data[0].password)){
                console.log("condition true");
                var token = jwt.sign(userData, secret, {
                    expiresIn: '10h'
                });
                res.json({
                    success:true,
                    token,
                    statusCode:200
                })
            }else{
                console.log("condition false");
                res.json({
                    success:false,
                    statusCode:404
                })
            }
        })
        .catch((e)=>{
            console.log(e);
            res.json(e)
        })
})

module.exports = router