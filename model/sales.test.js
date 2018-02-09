var Sales = require('./sales'),
    Users = require('./users'),
    {db1,db2} = require('./../db/index');

var user,sale,
{wait} = require('./../helper-funcs');

afterEach(() => {
    return wait(1)
})

describe('testing sales model ADD', () => {
    test('adding a sale Primary DB' , () => {
        Users.add({
            first_name:"Kike",
            last_name:"Marquez",
            birth_date:"11-03-1994",
            gender:true,
            email:"doas@gmail.com",
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
})



describe('testing sale model FETCH' , ()=>{
    test('fetching a sale primary DB', () => {
        return Sales.fetch({
            purchaser:user.users
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
        return Sales.update({
            purchaser: user.users,
            total: 1400,
            tax: 120,
            sales:sale.sales
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data:data.data,
                status:200
            })
        })
    })
})

describe('test sales model DELETE' , () => {
    test('deleting a sale primaryDB' , () => {
        return Sales.remove({
            sales:sale.sales
        },db1).then((data) => {
            Users.remove({
                users:user.users
            },db1).then(()=>{return null;})//cleanup user created to

            expect(data).toEqual({
                success:true,
                data:data.data,
                status:200
            })
        })
    })
})




