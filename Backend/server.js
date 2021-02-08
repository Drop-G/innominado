const express = require ('express');
const mongoose = require ('mongoose');
const app = express()

app.get('/', function(req,res){
    res.send("Hello Space")
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Listening on PORT 3000')
})