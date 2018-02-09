var express = require('express'),
    router = express.Router(),
    Sales = require('./../../model/sales'),
    SalesProduct= require('./../../model/sales.products.js'),
    {db1,db2} = require('./../../db/index'),
    auth = require('./../auth');

router.post('/', auth, (req,res) => {
    var data = req.body;
    var db = req.body.primaryDB? db1 : db2;
    var [total,tax] = data.products.reduce((totalTaxArray,product,index) => {
        var totalPrice = product.price * product.quantity;
        var totalTax = product.tax * product.quantity;
        if(index == 0)
            return [totalPrice, totalTax]
        return [totalTaxArray[0] + totalPrice, totalTaxArray[1] + totalTax]
    }, []);
    Sales.add({purchaser:data.purchaser, total,tax}, db)
        .then((saleData) => {
            console.log(saleData);
            var addProductsToSale = data.products.map(product => {
                return SalesProduct.add({sales:saleData.data.sales, products:product.products, quantity_sold: product.quantity},db)
            })
            return Promise.all(addProductsToSale)
        })
        .then((data) => res.json(data))
        .catch((error) => {
            console.log(error);
            res.json(error)
        })
})
.put('/', auth, (req,res) => {
    var db = req.body.primaryDB? db1 : db2;
    Sales.update(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})
.delete('/', auth, (req,res) => {
    var db = req.body.primaryDB? db1 : db2;
    Sales.remove(req.body,db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})
.get('/:purchaser/:db', (req,res) => {
    var db = req.params.db == 1? db1 : db2;
    Sales.fetch({purchaser:req.params.purchaser}, db)
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})

module.exports = router;
