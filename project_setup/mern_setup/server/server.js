const express = require('express');
const mysql = require ('mysql');
const app = express();
const { resolve } = require('path');
// const router = express.Router();

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
        'host': 'localhost',
        'user': 'root',
        'password': 'root',
        'database': 'pocketcards',
        'port': 3306,
        insecureAuth: true
    });


db.connect((err) => {
    if (err) throw err;

    console.log("Database Connected");

});

// module.exports = db;


//middleware 
app.use(express.static(resolve(__dirname,'client','dist')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

function errorHandling(req, res){
    res.status(req.status || 500).send(req.error || 'Server Error');
}


//Endpoints 

//get avatar & username from users (DONE)
app.get('/api/userhome/:userID', (req, res, next) => {
    let { userID } = req.params;
    let query = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
    let inserts = ['displayName', 'avatar', 'users', 'ID', 2];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);
    
    const output = {
        success: true
    };

    db.query(sql, (err, results) => {
        if (err) {
            req.status = 500;
            req.error = 'Error getting user data';
            return next();
        };

        output.users = results;

        //get all categories with userID (DONE)
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['sets', 'userID', userID];

        let sql = mysql.format(query, inserts);

        console.log("This is the formated SQL", sql);

        db.query(sql, (err, results)=>{
            if(err) {
                req.status = 500;
            req.error = 'Error getting user data';
            return next();
            };

            output.sets = results;
            res.send(output);
        });
 
    });
}, errorHandling);


// get category and all subcategory data of sets joined to topics based on userID (DONE)
app.get('/api/set_managing/:userID', (req, res, next)=> {
    const { userID } = req.params;
    let query = 'SELECT * FROM ?? INNER JOIN ?? ON sets.ID = topics.setID WHERE `userID` = ?'
    let inserts = ['topics', 'sets', Number(userID)];

    let sql = mysql.format(query, inserts);

    console.log("This is the formatted sql", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);


//get card front and back joined with setID (DONE)
app.get('/api/cards/:setID', (req, res, next)=>{
    const { setID } = req.params;
    let query = 'SELECT * FROM ?? INNER JOIN ?? ON topics.ID = cards.topicID WHERE ?? = ?'
    let inserts = ['cards', 'topics', 'setID', Number(setID)];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);

// post username and avatar (DONE, but without OATH/Password Fields)
app.post('/api/sign_up', (req, res, next)=>{
    const { displayName, avatar } = req.body;
    let query = 'INSERT INTO ??(??, ??) VALUES (?, ?)';
    let inserts = ['users', 'displayName', 'avatar', displayName, avatar];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);

// post category (DONE)
app.post('/api/set_management/create_category', (req, res, next)=>{
    const { userID, category } = req.body;
    let query = 'INSERT INTO ?? (??, ??) VALUES (?, ?)';
    let inserts = ['sets', 'userID', 'category', userID, category];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);

//post sub category (DONE)
app.post('/api/set_management/create_subcategory',(req, res, next)=>{
    const { setID, subCategory } = req.body;
    let query = 'INSERT INTO ??(??, ??) VALUES (?, ?)';
    let inserts = ['topics', 'setID', 'subCategory', Number(setID), subCategory];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);

//post to front cards and back (b/v)
app.post('/api/set_management/create_card', (req, res)=>{
    const { topicID, frontText, backText } = req.body;
    let query = 'INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)';
    let inserts = ['cards', 'topicID', 'frontText', 'backText', Number(topicID), frontText, backText];
    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);

//update front and back of card (DONE)
app.patch('/api/update_cards/:userID', (req, res, next)=>{
    const { ID, frontText, backText } = req.body;
    
    let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
    let inserts = ['cards', 'frontText', frontText, 'backText', backText, 'ID', Number(ID)];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const output = {
        success: true
    };

    db.query(sql, (err, results)=>{ console.error(err);
        if(err) {
            req.status = 500;
        req.error = 'Error getting user data';
        return next();
        };

        output.data = results;
        res.send(output);
    });
}, errorHandling);

// app.delete('/api/set_managing', (req, res)=>{
//     //delete functionality for cards

// });

// add routes to express app
// routes(app);

//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log("Tiff likes messing with gingers because she secretly loves them!");
});