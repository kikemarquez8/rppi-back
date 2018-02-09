/**
 * Created by Kike on 12/19/17.
 */
const {returnError} = require('./../helper-funcs');

function add(values, db){
    return db.one('INSERT INTO sales (purchaser, total,tax) VALUES (${purchaser}, ${total}, ${tax}) RETURNING *', values)
        .then((sale) => ({
            success:true,
            data: sale,
            status:201
        }))
        .catch(returnError)
}

function remove(values, db){
    return db.none('DELETE FROM sales WHERE sales = ${sales}', values)
        .then((success) => ({
            success:true,
            data:values,
            status:200
        }))
        .catch(returnError)
}


function update(values, db){
    return db.one('UPDATE sales SET purchaser = ${purchaser}, total = ${total}, tax = ${tax} WHERE sales = ${sales} RETURNING *',values )
        .then((updatedRow) => ({
            success: true,
            data: updatedRow,
            status: 200
        }))
        .catch(returnError)
}


function fetch(values, db){
    return db.many('SELECT * FROM sales WHERE purchaser = ${purchaser}', values)
        .then((rows) => ({
            success:true,
            data:rows,
            status:200
        }))
        .catch(returnError)
}

module.exports = { add, remove, update, fetch};
