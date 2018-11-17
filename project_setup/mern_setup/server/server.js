const express = require('express');
const mysql = require ('mysql');
const server = express();

const PORT = 3000 || 3001;

const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'pocketcards',
    'port': 3306
})

db.connect();

// server.use(express.static(resolve(__dirname,'client','dist')));
// server.use(express.urlendcoded({extended: false}));

server.listen(PORT, ()=>{
    console.log("I'm listening to your ginger soul");
})