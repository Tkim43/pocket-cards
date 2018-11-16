const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());

app.get('/api/test',(req,res) =>{
    res.send({
            success: true,
            message: 'API test working',
            something: 'something else'
        });
});

app.get ('/api/user', (req, res) => {
    res.send({
        success: true,
        username: 'brian',
        email: 'richchigga@gmail.com',
        name: 'brian'
    });
});

app.listen(PORT, ()=>{
    console.log("server running on Port", PORT)
});