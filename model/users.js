/**
 * Created by Kike on 12/19/17.
 */
const {returnError} = require('./../helper-funcs'),
    bcrypt = require('bcryptjs');


function add(values, db){
    return new Promise((resolve,reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(values.password, salt, function(err, hash) {
                var newValues = Object.assign({},values,{
                    password: hash
                })
                return db.one('INSERT INTO users (first_name,last_name, birth_date, gender, email, password) VALUES (${first_name}, ${last_name},${birth_date}, ${gender}, ${email}, ${password}) RETURNING *', newValues)
                    .then((data) => {
                        resolve({
                            success:true,
                            status:201,
                            data
                        })
                    })
                    .catch((error) => reject(returnError(error)))
            });
        });
    })
}

function remove(values, db){
    return db.none('DELETE FROM users WHERE users  = ${users}', values)
        .then((success) => ({
            success:true,
            data:values,
            status:200
        }))
        .catch(returnError)
}


function update(values, db){
    return db.one('UPDATE users SET first_name = ${first_name}, last_name = ${last_name}, gender = ${gender}, birth_date = ${birth_date} WHERE users = ${users} RETURNING *',values )
        .then((updatedRow) => ({
            success: true,
            data: updatedRow,
            status: 200
        }))
        .catch(returnError)
}


function fetch(values, db){
    return db.many('SELECT * FROM users WHERE email = ${email}', values)
        .then((rows) => ({
            success:true,
            data:rows,
            status:200
        }))
        .catch(returnError)
}

function totalSalesAmount(values,db) {
    return db.one('SELECT purchaser, SUM(total) as total FROM sales WHERE purchaser = ${user} GROUP BY purchaser', values)
        .then((row) => ({
            success:true,
            data:row,
            status:200
        }))
        .catch(returnError)
}

function totalByProduct(values,db) {
    return db.many(`
    SELECT qr.product, b.description, qr.total
        FROM
        (SELECT c.products as product, SUM(c.quantity_sold * d.price) as total
            FROM users a
                JOIN sales b ON a.users = b.purchaser
                 JOIN sales_products c ON b.sales = c.sales
                 JOIN products d ON c.products = d.products
                 WHERE a.email = $1
                 GROUP BY c.products
                )
        AS qr
        JOIN products b ON qr.product = b.products
        `,[values.email])
        .then((row) => ({
            success:true,
            data:row,
            status:200
        }))
        .catch(returnError)
}



module.exports = { add, remove, update, fetch, totalSalesAmount, totalByProduct};
