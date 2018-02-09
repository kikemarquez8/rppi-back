/**
 * Created by Kike on 12/19/17.
 */
const {returnError} = require('./../helper-funcs');

function add(values,db){
    return db.one('INSERT INTO products (description, price, category, tax) VALUES (${description},${price}, ${category}, ${tax}) RETURNING *', values)
        .then((product) => ({
            success:true,
            data: product,
            status:201
        }))
        .catch(returnError)
}

function remove(values,db){
    return db.none('DELETE FROM products WHERE products = ${products}', values)
        .then((success) => ({
            success:true,
            data:values,
            status:200
        }))
        .catch(returnError)
}


function update(values,db){
    return db.one('UPDATE products SET description = ${description}, price = ${price}, tax = ${tax} ,category = ${category}  WHERE products = ${products} RETURNING *',values )
        .then((updatedRow) => ({
            success: true,
            data: updatedRow,
            status: 200
        }))
        .catch(returnError)
}

function fetch(values,db){
    return db.many("SELECT * FROM products WHERE description ILIKE '%' || ${description} || '%' OR description ILIKE '%' || ${description} OR description ILIKE ${description} || '%' ", values)
        .then((rows) => ({
            success:true,
            data:rows,
            status:200
        }))
        .catch(returnError)
}

module.exports = { add, remove, update, fetch};
