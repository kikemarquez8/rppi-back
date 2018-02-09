/**
 * Created by Kike on 1/29/18.
 */
var app = require('express')(),
    bodyparser = require('body-parser'),
    port = 8080;

app.use(bodyparser.json());
app.use(require('./controllers'));

app.listen(port, ()=>{
    console.log(`SERVICES AVAILABLE AT localhost:${port}` )
})
