/**
 * Created by Kike on 12/18/17.
 */
let promiseLib = require('bluebird')
const config = require('./../config.json')
let options = {
    promiseLib
};
const pgp = require('pg-promise')(options);

var types = pgp.pg.types;
types.setTypeParser(1114, str => str);
types.setTypeParser(1184, str => str);
types.setTypeParser(1082, str => str);
const primaryConnectionString = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/rappi-db1`;
const secondaryConnectionString = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/rappi-db2`;


const db1 = pgp(primaryConnectionString);
const db2 = pgp(secondaryConnectionString);
module.exports = {
    db1,
    db2
}