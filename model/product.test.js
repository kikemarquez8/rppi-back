/**
 * Created by Kike on 1/30/18.
 */
var Products = require('./products'),
    {db1,db2} = require('./../db/index');

var productID;

//first test will take longer because of db connection.
//real execution time should be 4-10ms/request

describe('testing product model ADD', () => {
    test('adding a product Primary DB' , () => {
        return Products.add({
            description:"Manzanas",
            price: 10.00,
            category:1,
            tax:1.00
        },db1).then((data) => {
            expect(data).toEqual({
                success:true,
                data: data.data,
                status:201
            })
            productID = data.data.products
        })
    });
})

describe('test product model FETCH' , ()=>{
    test('fetching a product primary DB', () => {
        return Products.fetch({
            description:"mAnza"
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data: data.data,
                status:200
            })
        })
    })
})

describe('test product model UPDATE' , () => {
    test('updating a product primary DB', () => {
        return Products.update({
            description:"Sabrosas Manzanas verdes",
            price:11.00,
            tax:1.10,
            category:1,
            products : productID
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data:data.data,
                status:200
            })
        })
    })
})

describe('test product model DELETE', () => {
    test('deleting a product primray DB', () => {
        return Products.remove({products:productID},db1)
            .then(data => {
                expect(data).toEqual({
                    success:true,
                    data:data.data,
                    status:200
                })
            })
    })
})