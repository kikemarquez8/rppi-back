var Sales = require('./sales'),
    Products = require('./products'),
    Users = require('./users'),
    SaleProduct = require('./sales.products'),
    {db1,db2} = require('./../db/index');

var user,sale, product, saleProduct,
    {wait} = require('./../helper-funcs');

afterEach(() => {
    return wait(1.5)
})

describe('testing sales-product model ADD', () => {
    test('adding a sale Primary DB' , () => {
        Users.add({
            first_name:"Kike",
            last_name:"Marquez",
            birth_date:"11-03-1994",
            gender:true,
            email:"doaasss@gmail.com",
            password:"123456"
        },db1).then((userData) => {
            user = userData.data;
            Sales.add({
                purchaser:user.users,
                total:1413.12,
                tax:12.10
            },db1).then((saleData) => {
                sale = saleData.data
                expect(saleData).toEqual({
                    success:true,
                    status:201,
                    data: saleData.data
                })
            })
        })
    })

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
            product = data.data.products
        })
    });

    test('adding a sale.product Primary DB' ,() => {
        SaleProduct.add({
            quantity_sold:3,
            sales:sale.sales,
            products:product
        },db1).then((data) => {
            saleProduct = data.data.sales_products;
            expect(data).toEqual({
                success:true,
                data:data.data,
                status:201
            })
        })
    })

})



describe('testing sale.product model FETCH' , ()=>{
    test('fetching a sale.product primary DB', () => {
        return SaleProduct.fetch({
            sales_products :saleProduct
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data: data.data,
                status:200
            })
        })
    })
})



describe('test sales model UPDATE' , () => {
    test('updating a sale primary DB', () => {
        return SaleProduct.update({
            quantity_sold: 10,
            sales_products:saleProduct
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data:data.data,
                status:200
            })
        })
    })
})

//describe('test sales model DELETE' , () => {
//    test('deleting a sale primaryDB' , () => {
//        return SaleProduct.remove({
//            sales_products:saleProduct
//        },db1).then((data) => {
//            Users.remove({
//                users:user.users
//            },db1)
//                .then(()=>{
//                Sales.remove({
//                    sales:sale.sales
//                },db1)
//                .then(() => {
//                    Products.remove({
//                        products:product
//                    },db1)
//                    .then(null)
//                })
//            })
            //cleanup user, sale and product created to create the sale.product

            //expect(data).toEqual({
            //    success:true,
            //    data:data.data,
            //    status:200
            //})
        //})
    //})
//})
//

