const express = require('express')
const app = express()
const route = require("./route");
const controller = require("./controller")
app.use(route)
app.listen(5000,async ()=>{
    console.log(new Date());
    await controller.store_data();
    await controller.primary_hash();
    await controller.print_test()

    console.log(new Date());

    console.log("Server Started");
});