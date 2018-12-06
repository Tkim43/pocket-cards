const express = require('express');
const mysql = require ('mysql');
const app = express();
const { resolve } = require('path');
const { dbConfig } = require('./config');
// const router = express.Router();

const PORT = process.env.PORT || 3001;

console.log('DB CONFIG:', dbConfig);

const db = mysql.createConnection(dbConfig);


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
    let inserts = ['displayName', 'avatar', 'users', 'ID', Number(userID)];

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
        let inserts = ['sets', 'userID', Number(userID)];

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
app.get('/api/set_management/:userID/:setID', (req, res, next)=> {
    const { userID, setID } = req.params;
    let query = 'SELECT * FROM ?? INNER JOIN ?? ON sets.ID = topics.setID WHERE ?? = ? AND ?? = ?';
    let inserts = ['topics', 'sets', 'userID', Number(userID), 'setID', Number(setID)];

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
app.get('/api/cards/:setID/:topicID', (req, res, next)=>{
    const { setID, topicID } = req.params;
    let query = 'SELECT * FROM ?? INNER JOIN ?? ON topics.ID = cards.topicID WHERE ?? = ? AND ?? = ?'
    let inserts = ['cards', 'topics', 'setID', Number(setID), 'topicID', Number(topicID)];

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
    let inserts = ['sets', 'userID', 'category', Number(userID), category];

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

//post to front cards and back (DONE)
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


//delete displayName, subCategories, and all cards (DONE)
app.delete('/api/set_management/delete_user', (req, res, next)=>{
    const { ID } = req.body;
    
    let query = 'DELETE FROM ?? WHERE ??.??=?';
    let inserts = ['users','users','ID',Number(ID)];

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


// delete category, subCategories, and all cards (DONE)
app.delete('/api/set_management/delete_set', (req, res, next)=>{
    const { ID, userID } = req.body;
    
    let query = 'DELETE FROM ?? WHERE ??.??=? AND ??.??=?';
    let inserts = ['sets','sets','ID',Number(ID),'sets','userID',Number(userID)];

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


// delete subCategory and all cards (DONE)
app.delete('/api/set_management/delete_subCategory_set', (req, res, next)=>{
    const { ID, setID } = req.body;
    
    let query = 'DELETE FROM ?? WHERE ??.??=? AND ??.??=?';
    let inserts = ['topics','topics','ID',Number(ID),'topics','setID',Number(setID)];

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


//delete card (DONE)
app.delete('/api/set_management/delete_card', (req, res, next)=>{
        const { ID, topicID  } = req.body;
        
        let query = 'DELETE FROM ?? WHERE ?? = ? AND ?? = ?';
        let inserts = ['cards','ID',Number(ID), 'topicID', Number(topicID)];
    
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

// add routes to express app
// routes(app);

//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log("Tiff likes messing with gingers because she secretly loves them!");
});