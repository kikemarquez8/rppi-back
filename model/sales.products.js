/**
 * Created by Kike on 1/29/18.
 */
const {returnError} = require('./../helper-funcs');

function add(values,db){
    return db.one('INSERT INTO sales_products (quantity_sold, sales, products) VALUES (${quantity_sold},${sales}, ${products}) RETURNING *', values)
        .then((product) => ({
            success:true,
            data: product,
            status:201
        }))
        .catch(returnError)
}

function remove(values,db){
    return db.none('DELETE FROM sales_products WHERE sales_products = ${sales_products}', values)
        .then((success) => ({
            success:true,
            data:values,
            status:200
        }))
        .catch(returnError)
}


function update(values,db){
    return db.one('UPDATE sales_products SET quantity_sold= ${quantity_sold} WHERE sales_products= ${sales_products} RETURNING *',values )
        .then((updatedRow) => ({
            success: true,
            data: updatedRow,
            status: 200
        }))
        .catch(returnError)
}

function fetch(values,db){
    return db.many('SELECT * FROM sales_products WHERE sales_products = ${sales_products}', values)
        .then((rows) => ({
            success:true,
            data: rows,
            status:200
        }))
        .catch(returnError)
}

module.exports = { add, remove, update, fetch};
