/**
 * Created by Kike on 1/29/18.
 */
const pgtools = require('pgtools');
const prompt  = require('prompt');
const fs = require('fs');
prompt.start();

new Promise((resolve,reject) => {
    prompt.get([{
            name:"user",
            description: "PostgreSQL User (Default is postgres)",
            default:"postgres"
        },{
            name:"password",
            description:"PostgreSQL Password",
            hidden:true
        },
        {
            name:"port",
            description:"PSQL Server port (Default is 5432)",
            default:"5432"
        },
        {
            name:"host",
            description:"PSQL Server running host (Default is localhost)",
            default:"localhost"
        },
        {
            name:"JSONWebToken",
            description: "Secret key to encode JSONWebTokens",
            default:"123456"
        }
        ],function(err,result){
            if(err) reject(err)
            resolve(result)
    })
})
    .then(createConfigFile)
    .then((promptedValues) => {
        console.log(JSON.stringify(promptedValues))
        return Promise.all([pgtools.createdb(promptedValues, "rappi-db1"),pgtools.createdb(promptedValues, "rappi-db2")])
    })
    .then(() => {
        console.log("Successful DB creation")
    })
    .then(() => {
        require('./tables')();
    })
    .then(() => {
        console.log("Successfully created Tables")
    })
    .catch(console.error);


function createConfigFile(json) {
    return new Promise((resolve,reject) => {
        var outputDirectory = __dirname.split("/").reduce((accumulated,current,index,array) => {
            return array.length-1 == index || index == 0?accumulated:`${accumulated}/${current}`
        },"") + "/config.json";

        fs.writeFile(outputDirectory, JSON.stringify(json), 'utf8', (err,result) => {
            if(err) reject(err);
            resolve(json)
        })
    })
}