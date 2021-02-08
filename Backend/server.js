const express = require ('express');
const mongoose = require ('mongoose');
const app = express()
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Innominado", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', function(){ console.log("Connected to MongoDB") });
mongoose.connection.on('error', function (err) { console.log(err) });
mongoose.connection.on('disconnected', function(){console.log("Disconnected from MongoDB")})

app.get('/', function(req,res){
    res.send("Hello Space")
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Listening on PORT 3000')
})