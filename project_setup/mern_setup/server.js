const express = require('express');
const mysql = require('mysql');
const db = require('./server/db');
const app = express();
const { resolve } = require('path');
const { requireAuth } = require('./server/services/passport');
const PORT = process.env.PORT || 3001;

//middleware 
app.use(express.static(resolve(__dirname,'client','dist')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

function errorHandling(req, res){
    res.status(req.status || 500).send(req.error || 'Server Error');
}

//Endpoints

// Auth routes
require('./server/routes')(app);

//get avatar & username from users (DONE)
app.get('/api/userhome', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;

        //get all categories with userID (DONE)
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        const inserts = ['sets', 'userID', user.ID];

        const sql = mysql.format(query, inserts);

        // console.log("This is the formated SQL:", sql);

        const sets = await db.query(sql);

        res.send({
            success: true,
            sets
        });
    } catch (err){
        req.status = 500;
        req.error = 'Error getting user sets';

        return next();
    }
    
}, errorHandling);


// get category and all subcategory data of sets joined to topics based on userID (DONE)
app.get('/api/set_management/:setID', requireAuth, async (req, res, next)=> {
    const { params: { setID }, user } = req;

    try {
        const query = 'SELECT * FROM ?? INNER JOIN ?? ON sets.ID = topics.setID WHERE ?? = ? AND ?? = ?';
        const inserts = ['topics', 'sets', 'userID', user.ID, 'setID', setID];

        const sql = mysql.format(query, inserts);

        // console.log("This is the formatted sql", sql);

        const sets = await db.query(sql);

        res.send({
            success: true,
            sets
        });
    } catch(err){
        req.status = 500;
        req.error = 'Error getting set topics';
        
        return next();
    }
    
}, errorHandling);


//get card front and back joined with setID (DONE)
app.get('/api/cards/:setID/topic/:topicID', requireAuth, async (req, res, next)=>{
    const { setID, topicID } = req.params;

    try {
        const query = 'SELECT * FROM ?? INNER JOIN ?? ON topics.ID = cards.topicID WHERE ?? = ? AND ?? = ?'
        const inserts = ['cards', 'topics', 'setID', Number(setID), 'topicID', Number(topicID)];

        const sql = mysql.format(query, inserts);

        // console.log("This is the formated SQL", sql);

        const card = await db.query(sql);

        res.send({
            success: true,
            card
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error getting set topic';
        
        return next();
    }
    
}, errorHandling);

// // post username and avatar (DONE)
// // Moved to controllers/auth/index.js

// post category (DONE)
app.post('/api/set_management/create_category/', requireAuth, async (req, res, next)=>{
    const { category, userID } = req.body;
    const { user } = req;

    try {

        const query = 'INSERT INTO ?? (??, ??) VALUES (?, ?)';
        const inserts = ['sets', 'userID', 'category', Number(userID), category];

        const sql = mysql.format(query, inserts);

        // console.log("This is the formated SQL", sql);

        const category = await db.query(sql);

        res.send({
            success: true,
            category
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error posting category';

        return next();
    }
}, errorHandling);

// //post sub category (DONE)
app.post('/api/set_management/create_subcategory/:setID', requireAuth, async (req, res, next)=>{
    const { setID } = req.params;
    const {subCategory} = req.body;
    const {user} = req;

    try {
        let query = 'INSERT INTO ??(??, ??) VALUES (?, ?)';
        let inserts = ['topics', 'setID', 'subCategory', Number(setID), subCategory];

        let sql = mysql.format(query, inserts);

        console.log("This is the formated SQL", sql);

        const subCategory = await db.query(sql);

        res.send({
            success: true,
            subCategory
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error posting subCategory';

        return next();
    }
}, errorHandling);

//post to front cards and back (DONE)
app.post('/api/set_management/create_card/topics/:topicID', requireAuth, async (req, res, next)=>{
    const {topicID} = req.params;
    const { frontText, backText } = req.body;
    const {user} = req;
    
    try {
        const query = 'INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)';
        const inserts = ['cards', 'topicID', 'frontText', 'backText', cards.topicID, frontText, backText];
        const sql = mysql.format(query, inserts);

        console.log("This is the formated SQL", sql);

        const card = await db.query(sql);

        res.send({
            success: true,
            card
        });
        
    } catch(err) {
        
        req.status = 500;
        req.error = 'Error posting cards';

        return next();
    }
}, errorHandling);

//update front and back of card (DONE)
app.patch('/api/update_card/ID/:ID', async (req, res, next)=>{
    const {frontText, backText } = req.body;
    const {ID} =req.params;
    const {user} = req;

    try {
    
        let query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
        let inserts = ['cards', 'frontText', frontText, 'backText', backText, 'ID', Number(ID)];

        let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    const cards = await db.query(sql);

        res.send({
            success: true,
            cards
        });
        
    } catch(err) {
        
        req.status = 500;
        req.error = 'Error updating card';

        return next();
    }
}, errorHandling);


//delete displayName, subCategories, and all cards (DONE)
app.post('/api/set_management/delete_user', (req, res, next)=>{
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
app.delete('/api/set_management/ID/:ID/userID/:userID', (req, res, next)=>{
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
app.post('/api/set_management/delete_subCategory_set', (req, res, next)=>{
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
app.post('/api/set_management/delete_card', (req, res, next)=>{
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
    console.log('Server running on PORT:', PORT);
});