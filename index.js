const express = require('express');
const PORT = process.env.PORT || 9000;

const app = express();

app.get('/test',(req,res) =>{
    res.send('<h1>this is a test route, and it is work </h1>');
});

app.listen(PORT, ()=>{
    console.log("server running on Port", PORT)
});