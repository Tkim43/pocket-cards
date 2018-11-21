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

server.get('api/:userID/userhome', (req, res, next) => {
    //get avatar & username from users
    // SELECT `displayName`, `avatar` FROM `users` WHERE ID = :userID

});

server.get('/api/:userID/userhome', (req, res) => {
    //get category from sets
    // SELECT `category` FROM `sets` WHERE userID = :userID


});

server.post('/api/:userID/input_category', (req, res, next)=>{
    //post category
    //INSERT INTO `sets`(`userID`, `category`) VALUES (:userID, :category)

});

server.post('/api/:setID/input_category',(req, res)=>{
    //post sub category
    // INSERT INTO `topics`(`setID`, `subCategory`) VALUES (:setID, :category)
})


server.post('/api/:topicID/create_card', (req, res)=>{
    //post to front cards and back
    // INSERT INTO `cards`(`topicID`, `frontText`, `backText`) VALUES (topicID, frontText, backText')
    

});

server.get('/api/:topicID/card', (req, res)=>{
    //get card front and back
    // SELECT * FROM `cards` WHERE `topicID`= :topicID

});


server.patch('/api/:topicID/update_card_front', (req, res)=>{
    //update front of card
    // UPDATE `cards` SET `frontText`=frontText WHERE `topicID`= topicID

});

server.patch('api/:topicID/update_card_back', (req, res)=>{
    //update back of card
    // UPDATE `cards` SET `backText`=backText WHERE `topicID`= topicID

});

server.get('/api/:userID/set_managing', (req, res, next)=> {
    //get category from sets
    // SELECT `category` FROM `sets` WHERE userID = :userID


});

server.get('/api/:setID/set_managing', (req, res)=> {
    //get sub category from topics
    // SELECT `subCategory` FROM `topics` WHERE `setID` = :setID

});

// server.delete('/api/set_managing', (req, res)=>{
//     //delete functionality for cards

// });


server.listen(PORT, ()=>{
    console.log("I'm listening to your ginger soul");
});