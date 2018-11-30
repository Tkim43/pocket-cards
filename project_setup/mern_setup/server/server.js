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
        'database': 'pocketcardstest',
        'port': 8889,
        insecureAuth: true
    });


db.connect((err) => {
    if (err) throw err;

    console.log('Database Connected');

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
    let inserts = ['displayName', 'avatar', 'users', 'ID', userID];

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


// get category and all subcategory data of sets joined to topics based on userID (done), but params not working (tiff and viena)
app.get('/api/set_managing/:userID', (req, res, next)=> {
    const { userID } = req.params;
    let query = 'SELECT * FROM `topics` INNER JOIN `sets` ON sets.ID = topics.setID WHERE `userID` = userID'
    let inserts = ['topics', 'sets', Number(userID)];
    // let query = 'SELECT ?? FROM ?? WHERE ?? = ?';
    // let inserts = ['category', 'sets', 'userID', userID];

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


// //get sub category from topics (tiff)
// app.get('/api/set_managing/:setID', (req, res)=> {
//     const { setID } = req.params;
//     let query = 'SELECT ?? FROM ?? WHERE ?? = ?';
//     let inserts = ['subCategory', 'topics', 'setID', setID];

//     let sql = mysql.format(query, inserts);

//     console.log("This is the formatted sql", sql);

//     const output = {
//         success: true
//     };

//     db.query(sql, (err, results)=>{
//         if(err) {
//             req.status = 500;
//         req.error = 'Error getting user data';
//         return next();
//         };

//         output.data = results;
//         res.send(output);
//     });
// }, errorHandling);

//get card front and back (tiff)
app.get('/api/card/:topicID', (req, res, next)=>{
    const { topicID } = req.params;
    let query = 'SELECT * FROM ?? WHERE ??= ?';
    let inserts = ['cards', 'topicID', topicID];

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


//post sub category (vienna)
app.post('/api/create_subcategory',(req, res, next)=>{
    const { setID, category } = req.body;
    let query = 'INSERT INTO ??(??, ??) VALUES (?, ?)';
    let inserts = ['topics', 'setID', 'subCategory', setID, category];

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

//post category (vienna)
app.post('/api/create_category', (req, res, next)=>{
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

// //post to front cards and back (b/v)
// app.post('/api/:topicID/create_card', (req, res)=>{
//     const { topicID } = req.body;
//     let query = 'INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)';
//     let inserts = ['cards', 'topicID', 'frontText', 'backText', topicID, frontText, backText];
//     let sql = mysql.format(query, inserts);

//     console.log("This is the formated SQL", sql);

//     //error handling
//     db.query(sql, (err, results, fields)=>{
//         if(err) return next(err);

//         const output = {
//             success: true,
//             data: results
//         };
//         res.json(output);
//     });


// });

// //update front of card (tiff)
// app.patch('/api/:topicID/update_card_front', (req, res)=>{
//     const { topicID } = req.params;
    
//     let query = 'UPDATE ?? SET ??=? WHERE ??= ?';
//     let inserts = ['cards', 'frontText', frontText, 'topicID', topicID];

//     let sql = mysql.format(query, inserts);

//     console.log("This is the formated SQL", sql);

//     //error handling
//     db.query(sql, (err, results, fields)=>{
//         if(err) return next(err);

//         const output = {
//             success: true,
//             data: results
//         };
//         res.json(output);
//     });

// });

// //update back of card (tiff)
// app.patch('api/:topicID/update_card_back', (req, res)=>{
//     const { topicID } = req.params;
//     let query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
//     let inserts = ['cards', 'backText', backText, 'topicID', topicID]

//     console.log("This is the formated SQL", sql);

//     //error handling
//     db.query(sql, (err, results, fields)=>{
//         if(err) return next(err);

//         const output = {
//             success: true,
//             data: results
//         };
//         res.json(output);
//     });

// });

// app.delete('/api/set_managing', (req, res)=>{
//     //delete functionality for cards

// });

// add routes to express app
// routes(app);

//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log("I'm listening to Tiffany's Demands ... give her all the endpoints she wants");
});