/**
 * Created by Kike on 1/29/18.
 */
var express = require('express'),
    router = express.Router(),
    User = require('./../../model/users'),
    {db1,db2} = require('./../../db/index'),
    auth = require('./../auth');

router.post('/', (req,res) => {
    var db = req.body.primaryDB?db1:db2;
    User.add(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}).delete('/' , auth, (req,res) => {
    var db = req.body.primaryDB?db1:db2;
    User.remove(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}).put('/', auth, (req,res) => {
    var db = req.body.primaryDB?db1:db2;
    User.update(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}).get('/:email/:db' , (req,res) => {
    var db = req.params.db == 1?db1:db2;
    User.fetch({email:req.params.email}, db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})

module.exports = router;