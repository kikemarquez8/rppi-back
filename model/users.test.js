var Users = require('./users'),
    {db1,db2} = require('./../db/index');
var user;
var {wait} = require('./../helper-funcs')
afterEach(()=> {
    return wait(1);
})
//because of salt generation add test must be delayed so it wont overlap with the fetch test
describe('testing sales model ADD', () => {
    test('adding a sale Primary DB' , () => {
        Users.add({
            first_name:"Kike",
            last_name:"Marquez",
            birth_date:"11-03-1994",
            gender:true,
            email:"kikemarquez18@gmail.com",
            password:"123456"
        },db1).then((userData)=>{
            expect(userData).toEqual({
                success:true,
                status:201,
                data:userData.data
            })
            user = userData.data.users
        })
    })
})


describe('test user model FETCH' , ()=>{
    test('fetching a  user primary DB', () => {
        return Users.fetch({
            email:"kikemarquez18@gmail.com"
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data: data.data,
                status:200
            })
        })
    })
})


describe('test users model UPDATE' , () => {
    test('updating a user primary DB', () => {
        return Users.update({
            first_name:"Orangel",
            last_name:"Marquez",
            birth_date:"11-03-1994",
            gender:true,
            users:user
        },db1).then(data => {
            expect(data).toEqual({
                success:true,
                data:data.data,
                status:200
            })
        })
    })
})

describe('test users model DELETE' , () => {
    test('deleting a user primaryDB' , () => {
        return Users.remove({
            users:user
        },db1).then((data) => {
            expect(data).toEqual({
                success:true,
                data:data.data,
                status:200
            })
        })
    })
})