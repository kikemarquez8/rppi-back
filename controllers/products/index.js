/**
 * Created by Kike on 1/29/18.
 */
var express = require('express'),
    router = express.Router(),
    Products = require('./../../model/products'),
    {db1,db2} = require('./../../db/index'),
    auth = require('./../auth');

router.post('/', auth, (req,res) => {
    var db = req.body.primaryDB?db1:db2;
    Products.add(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}).delete('/' , auth, (req,res) => {
    var db = req.body.primaryDB?db1:db2;
    Products.remove(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}).put('/', auth, (req,res) => {
    var db = req.body.primaryDB?db1:db2;
    Products.update(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}).get('/:description/:db' , (req,res) => {
    var db = req.params.db == 1?db1:db2;
    Products.fetch({description:req.params.description}, db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})

module.exports = router;