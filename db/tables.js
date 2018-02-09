/**
 * Created by Kike on 1/29/18.
 */
const path = require('path');
const QueryFile = require('pg-promise').QueryFile;
const {db1, db2} = require('./index');
function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, {minify: true});
}


const createInitialTables = sql("sql/tables.sql");

module.exports = ()=> {
    db1.tx(t => {
        return t.batch([t.none(createInitialTables)])
    }).then(() =>{
            console.log("succesfuly created tables on DB1");
            return db2.tx( t => {
                return t.batch([t.none(createInitialTables)])
            })
        })
        .then(() => {
            console.log("succesfuly created tables on DB2");
        })
        .catch((error) => {
            console.error(error);
            console.error("Something went wront. Execute reset.js")
        })
}
