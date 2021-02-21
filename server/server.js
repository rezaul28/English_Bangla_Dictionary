const express = require('express')
const app = express()
const route = require("./route");
const controller = require("./controller")
var cors = require('cors')
app.use(cors())

app.use(route)
app.listen(5000,async ()=>{
    console.log(new Date());
    await controller.store_data();
    await controller.primary_hash();
    await controller.secondary_hash()

    console.log(new Date());

    console.log("Server Started");
});